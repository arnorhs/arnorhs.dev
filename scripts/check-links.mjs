#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const DEFAULTS = {
  dir: 'content/posts',
  baseUrl: 'https://arnorhs.dev',
  concurrency: 10,
  timeoutMs: 15000,
  externalOnly: false,
  failOnWarn: false,
}

function printHelp() {
  console.log(`Link checker for markdown posts.

Usage:
  node scripts/check-links.mjs [options]

Options:
  --dir <path>            Directory to scan (default: ${DEFAULTS.dir})
  --base-url <url>        Base URL for root-relative links (default: ${DEFAULTS.baseUrl})
  --concurrency <n>       Number of parallel requests (default: ${DEFAULTS.concurrency})
  --timeout-ms <n>        Per-request timeout in milliseconds (default: ${DEFAULTS.timeoutMs})
  --external-only         Only check http(s) links, skip root-relative links
  --fail-on-warn          Exit with code 1 if warnings exist (401/403/429)
  --help                  Show this help
`)
}

function parseArgs(argv) {
  const config = { ...DEFAULTS }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]

    if (arg === '--help' || arg === '-h') {
      config.help = true
    } else if (arg === '--external-only') {
      config.externalOnly = true
    } else if (arg === '--fail-on-warn') {
      config.failOnWarn = true
    } else if (arg === '--dir') {
      config.dir = argv[++i]
    } else if (arg.startsWith('--dir=')) {
      config.dir = arg.split('=')[1]
    } else if (arg === '--base-url') {
      config.baseUrl = argv[++i]
    } else if (arg.startsWith('--base-url=')) {
      config.baseUrl = arg.split('=')[1]
    } else if (arg === '--concurrency') {
      config.concurrency = Number.parseInt(argv[++i], 10)
    } else if (arg.startsWith('--concurrency=')) {
      config.concurrency = Number.parseInt(arg.split('=')[1], 10)
    } else if (arg === '--timeout-ms') {
      config.timeoutMs = Number.parseInt(argv[++i], 10)
    } else if (arg.startsWith('--timeout-ms=')) {
      config.timeoutMs = Number.parseInt(arg.split('=')[1], 10)
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  if (!Number.isInteger(config.concurrency) || config.concurrency < 1) {
    throw new Error('--concurrency must be a positive integer')
  }

  if (!Number.isInteger(config.timeoutMs) || config.timeoutMs < 1000) {
    throw new Error('--timeout-ms must be an integer >= 1000')
  }

  return config
}

async function walkMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

function stripTrailingPunctuation(url) {
  let cleaned = url.trim()

  while (/[.,;:!?]$/.test(cleaned)) {
    cleaned = cleaned.slice(0, -1)
  }

  // If there are more closing parentheses than opening ones, trim one.
  while (cleaned.endsWith(')')) {
    const opens = [...cleaned].filter((c) => c === '(').length
    const closes = [...cleaned].filter((c) => c === ')').length
    if (closes <= opens) break
    cleaned = cleaned.slice(0, -1)
  }

  return cleaned
}

function shouldSkip(rawUrl) {
  return (
    !rawUrl ||
    rawUrl.startsWith('#') ||
    rawUrl.startsWith('mailto:') ||
    rawUrl.startsWith('tel:') ||
    rawUrl.startsWith('javascript:') ||
    rawUrl.startsWith('data:')
  )
}

function normalizeUrl(rawUrl, config) {
  const cleaned = stripTrailingPunctuation(rawUrl.replace(/^<|>$/g, ''))
  if (shouldSkip(cleaned)) return null

  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    const u = new URL(cleaned)
    u.hash = ''
    return u.toString()
  }

  if (!config.externalOnly && cleaned.startsWith('/')) {
    const u = new URL(cleaned, config.baseUrl)
    u.hash = ''
    return u.toString()
  }

  return null
}

function extractLinksFromLine(line) {
  const links = []

  const markdownLinkRegex = /\[[^\]]*\]\(([^)\s]+(?:\)[^)\s]+)*)(?:\s+"[^"]*")?\)/g
  const bareUrlRegex = /https?:\/\/[^\s<>"]+/g

  for (const match of line.matchAll(markdownLinkRegex)) {
    links.push(match[1])
  }

  // Remove markdown links before scanning for bare URLs to avoid grabbing
  // `https://x](https://y)` as a single bare URL.
  const lineWithoutMarkdownLinks = line.replace(/\[[^\]]*\]\([^)]*\)/g, ' ')

  for (const match of lineWithoutMarkdownLinks.matchAll(bareUrlRegex)) {
    links.push(match[0])
  }

  return links
}

async function collectLinks(files, config) {
  const occurrences = new Map()

  for (const file of files) {
    const content = await readFile(file, 'utf8')
    const lines = content.split(/\r?\n/)

    lines.forEach((line, index) => {
      const lineNo = index + 1
      const links = extractLinksFromLine(line)
      const uniqueLineLinks = new Set()

      for (const rawLink of links) {
        const normalized = normalizeUrl(rawLink, config)
        if (!normalized || uniqueLineLinks.has(normalized)) continue
        uniqueLineLinks.add(normalized)

        if (!occurrences.has(normalized)) occurrences.set(normalized, [])
        occurrences.get(normalized).push({ file, line: lineNo, raw: rawLink })
      }
    })
  }

  return occurrences
}

function classifyStatus(status) {
  if (status < 400) return 'ok'
  if (status === 401 || status === 403 || status === 429) return 'warn'
  return 'fail'
}

async function checkOneUrl(url, config) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs)

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'arnorhs.dev-link-checker/1.0 (+https://arnorhs.dev/)',
        accept: 'text/html,application/xhtml+xml,*/*;q=0.8',
      },
    })

    response.body?.cancel?.()

    return {
      url,
      finalUrl: response.url,
      status: response.status,
      outcome: classifyStatus(response.status),
    }
  } catch (error) {
    const message =
      error?.name === 'AbortError' ? 'Request timed out' : error?.message || String(error)
    return {
      url,
      finalUrl: null,
      status: null,
      outcome: 'fail',
      error: message,
    }
  } finally {
    clearTimeout(timeout)
  }
}

async function runWithConcurrency(items, limit, worker) {
  const results = new Array(items.length)
  let nextIndex = 0

  async function runner() {
    while (true) {
      const index = nextIndex
      nextIndex += 1
      if (index >= items.length) return
      results[index] = await worker(items[index], index)
    }
  }

  const runners = Array.from({ length: Math.min(limit, items.length) }, () => runner())
  await Promise.all(runners)

  return results
}

function formatLocations(locations, max = 5) {
  const list = locations.slice(0, max).map((loc) => `${loc.file}:${loc.line}`)
  if (locations.length > max) list.push(`... +${locations.length - max} more`)
  return list.join(', ')
}

async function main() {
  const config = parseArgs(process.argv.slice(2))

  if (config.help) {
    printHelp()
    return
  }

  const files = await walkMarkdownFiles(config.dir)
  const linkOccurrences = await collectLinks(files, config)
  const urls = [...linkOccurrences.keys()]

  console.log(`Scanning ${files.length} markdown files in ${config.dir}`)
  console.log(
    `Found ${urls.length} unique links (${[...linkOccurrences.values()].flat().length} occurrences)`,
  )

  if (urls.length === 0) {
    console.log('No links found.')
    return
  }

  const results = await runWithConcurrency(urls, config.concurrency, (url) =>
    checkOneUrl(url, config),
  )

  const failures = []
  const warnings = []
  let okCount = 0

  for (const result of results) {
    if (result.outcome === 'ok') {
      okCount += 1
      continue
    }

    const entry = {
      ...result,
      locations: linkOccurrences.get(result.url) || [],
    }

    if (result.outcome === 'warn') warnings.push(entry)
    else failures.push(entry)
  }

  console.log('')
  console.log(`OK: ${okCount} | WARN: ${warnings.length} | FAIL: ${failures.length}`)

  if (warnings.length > 0) {
    console.log('\nWarnings (often bot/access blocked):')
    for (const warning of warnings) {
      const statusLabel = warning.status ?? 'ERR'
      console.log(`- [WARN ${statusLabel}] ${warning.url}`)
      if (warning.finalUrl && warning.finalUrl !== warning.url) {
        console.log(`    final: ${warning.finalUrl}`)
      }
      if (warning.error) {
        console.log(`    error: ${warning.error}`)
      }
      console.log(`    at: ${formatLocations(warning.locations)}`)
    }
  }

  if (failures.length > 0) {
    console.log('\nFailures:')
    for (const failure of failures) {
      const statusLabel = failure.status ?? 'ERR'
      console.log(`- [FAIL ${statusLabel}] ${failure.url}`)
      if (failure.finalUrl && failure.finalUrl !== failure.url) {
        console.log(`    final: ${failure.finalUrl}`)
      }
      if (failure.error) {
        console.log(`    error: ${failure.error}`)
      }
      console.log(`    at: ${formatLocations(failure.locations)}`)
    }
  }

  if (failures.length > 0 || (config.failOnWarn && warnings.length > 0)) {
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
