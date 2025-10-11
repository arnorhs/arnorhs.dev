import { transformMd } from './markdown'
import { marked } from 'marked'
import { sortBy } from './sortBy'
import type { Post } from '../lib/types'
import path from 'node:path'
import { readdir, readFile } from 'node:fs/promises'

const markdownPath = path.resolve(process.cwd(), 'content/md')
const utf8 = { encoding: 'utf-8' as BufferEncoding }

const getMarkdownPosts = async (): Promise<Post[]> => {
  const {
    default: { loadFront },
  } = await import('yaml-front-matter')

  const files = await readdir(markdownPath, {
    encoding: 'utf-8',
    recursive: true,
  })

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
        filename: path.basename(fn),
        html: marked.parse(__content),
        metadata: frontmatter,
      }
    })
    .map((x) => transformMd(x))
}

export const getPostCollection = async (): Promise<Post[]> => {
  return (await getMarkdownPosts()).sort(sortBy<{}>('publishedDate', 'desc'))
}
