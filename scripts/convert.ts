#!/usr/bin/env bun

import fs from 'fs'
import path from 'path'
import TurndownService from 'turndown'

// This is a conversion script that converts all the old wordpress posts
// to markdown files with frontmatter that can be used by the astro site

import _posts from '../posts/content/wp/wpposts.json'

// This is the shape of the wordpress posts in the json file
type WpPost = {
  post_modified_gmt: string
  to_ping: string
  post_parent: number
  guid: string
  post_modified: string
  post_date_gmt: string
  menu_order: number
  post_password: string
  ping_status: string
  post_title: string
  post_date: string
  post_type: 'revision' | 'post' | 'page'
  post_excerpt: string
  comment_count: number
  post_content: string
  comment_status: string
  ID: number
  post_author: number
  post_name: string
  post_mime_type: string
  pinged: string
  post_status: 'inherit' | 'publish' | 'draft'
  post_content_filtered: string
}

// These are the typed list of posts
const posts = _posts as WpPost[]

const turndownService = new TurndownService()

const outputDir = path.join(process.cwd(), 'posts/content/md')

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const publishedPosts = posts.filter(
  (post) => post.post_status === 'publish' && post.post_type === 'post',
)

console.log(`Found ${publishedPosts.length} posts to convert.`)

// Using new RegExp() to avoid issues with writing regex literals to the file
const quoteRegex = new RegExp('"', 'g')
const newlineRegex = new RegExp('\r?\n', 'g')
const multiSpaceRegex = new RegExp('\\s+', 'g')

for (const post of publishedPosts) {
  if (!post.post_name) {
    console.warn(`Skipping post with empty post_name (ID: ${post.ID})`)
    continue
  }

  const postDate = new Date(post.post_date)
  if (isNaN(postDate.getTime())) {
    console.warn(`Skipping post with invalid date (ID: ${post.ID}): ${post.post_date}`)
    continue
  }

  const year = postDate.getUTCFullYear().toString()
  const month = (postDate.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = postDate.getUTCDate().toString().padStart(2, '0')
  const date = `${year}-${month}-${day}`

  const yearDir = path.join(outputDir, year)
  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true })
  }

  const rawSummary = post.post_excerpt || post.post_content.substring(0, 200)
  let summary = turndownService.turndown(rawSummary)

  if (!post.post_excerpt && post.post_content.length > 200) {
    summary += '...'
  }

  const title = post.post_title

  const markdownContent = turndownService.turndown(post.post_content.replace(newlineRegex, '\n\n'))

  const frontmatter = `---
title: ${JSON.stringify(title)}
summary: ${JSON.stringify(summary)}
date: ${date}
---
`

  const finalContent = `${frontmatter}\n${markdownContent}`
  const filename = path.join(yearDir, `${post.post_name}.md`)

  try {
    fs.writeFileSync(filename, finalContent)
    console.log(`Converted: ${filename}`)
  } catch (error) {
    console.error(`Failed to write file ${filename}:`, error)
  }
}

console.log('Conversion complete!')
