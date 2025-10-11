import { transformMd } from './markdown'
import { resolvePath, readDir, readFile } from './util'
import { marked } from 'marked'
import { sortBy } from './sortBy'
import type { Post } from '../lib/types'

// jeez.. rollup please save me
const rootDir = resolvePath(__dirname, __filename.endsWith('.ts') ? '../..' : '..')

const markdownPath = resolvePath(rootDir, 'content/md')
const utf8 = { encoding: 'utf-8' as BufferEncoding }

const getMarkdownPosts = async (): Promise<Post[]> => {
  const x = await import('yaml-front-matter')
  const loadFront = x.default.loadFront
  const files = await readDir(markdownPath, {
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
        filename: fn,
        html: marked.parse(__content),
        metadata: frontmatter,
      }
    })
    .map((x) => transformMd(x))
}

export const getPostCollection = async (): Promise<Post[]> => {
  return (await getMarkdownPosts()).sort(sortBy<{}>('publishedDate', 'desc'))
}
