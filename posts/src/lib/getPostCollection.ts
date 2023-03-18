import { fromWordPressHtml, transformMd, transformWp } from './transformers'
import { Post, WpPost } from './types'
import { resolvePath, readDir, readFile } from './util'
import { loadFront } from './yfm'
import { marked } from 'marked'
import chalk from 'chalk'
import { diffLines } from 'diff'
import { sortBy } from './sortBy'

// jeez.. rollup please save me
const rootDir = resolvePath(__dirname, __filename.endsWith('.ts') ? '../..' : '..')

const markdownPath = resolvePath(rootDir, 'content/md')
const wpPath = resolvePath(rootDir, 'content/wp/wpposts.json')
const utf8 = { encoding: 'utf-8' as BufferEncoding }

function logRecursive(obj: { [key: number]: WpPost[] }, parentId: number, indent = 0) {
  if (!obj[parentId]) {
    return
  }

  let last = ''
  obj[parentId].forEach((p) => {
    console.log(`${' '.repeat(indent)}${p.ID} ${p.post_name} ${p.post_type} ${p.post_status}`)
    console.log(`${' '.repeat(indent + 2)}  ${p.post_title} ${p.post_date}`)
    const markup = fromWordPressHtml(p.post_content)
    const d = diffLines(last, markup)
    for (const { added, removed, value } of d) {
      if (added || removed) {
        if (added) {
          console.log(' '.repeat(indent + 4) + chalk.green(`+ ${value}`))
        } else {
          console.log(' '.repeat(indent + 4) + chalk.red(`+ ${value}`))
        }
      }
    }

    last = markup

    logRecursive(obj, p.ID, indent + 2)
  })
}

const getLegacyPosts = async (): Promise<Post[]> => {
  const posts = JSON.parse(await readFile(wpPath, utf8)) as WpPost[]

  const postsById = posts.reduce((acc, p) => {
    acc[p.ID] = p
    return acc
  }, {} as { [key: number]: WpPost })

  // for printing
  const sorted = posts.sort((a, b) => {
    const aDate = new Date(a.post_date).getTime()
    const bDate = new Date(b.post_date).getTime()

    return aDate - bDate
  })

  const byParentId = sorted.reduce((acc, p) => {
    if (!acc[p.post_parent]) {
      acc[p.post_parent] = []
    }

    acc[p.post_parent].push(p)

    return acc
  }, {} as { [key: number]: WpPost[] })

  const mainPosts = byParentId[0]

  const allPostsWithLatestRevision = mainPosts.map((p) => {
    const childPosts = (byParentId[p.ID] ?? []).filter((p) => p.post_type === 'revision')
    const lastUpdatedPost = childPosts.length > 0 ? childPosts[childPosts.length - 1] : p

    return {
      ...p,
      post_title: lastUpdatedPost.post_title,
      post_content: lastUpdatedPost.post_content,
    } as WpPost
  })

  // more logging
  // logRecursive(byParentId, 1414)

  return allPostsWithLatestRevision
    .filter((p) => p.post_type === 'post' && p.post_status === 'publish')
    .map((x) => transformWp(x))
}

const getMarkdownPosts = async (): Promise<Post[]> => {
  const files = await readDir(markdownPath, utf8)

  return (
    await Promise.all(
      files
        .filter((fn) => fn.match(/\.md$/))
        .map(async (fn) => ({
          contents: await readFile(`${markdownPath}/${fn}`, utf8),
          fn,
        })),
    )
  )
    .map(({ fn, contents }) => {
      const { __content, ...frontmatter } = loadFront(contents)

      return {
        filename: fn,
        html: marked.parse(__content),
        metadata: frontmatter,
      }
    })
    .map((x) => transformMd(x))
}

export const getPostCollection = async (): Promise<Post[]> => {
  const [mdPosts, wpPosts] = await Promise.all([getMarkdownPosts(), getLegacyPosts()])

  // TODO: i guess it would be nice to have proper type inferrence here
  return [...mdPosts, ...wpPosts].sort(sortBy<{}>('publishedDate', 'desc'))
}
