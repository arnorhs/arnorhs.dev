import { marked } from 'marked'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Post } from '../lib/types'
import { transformMd } from './transformMd'

const utf8 = { encoding: 'utf-8' as BufferEncoding }

export async function getMarkdownPosts(postsDir: string): Promise<Post[]> {
  const {
    default: { loadFront },
  } = await import('yaml-front-matter')

  const files = await readdir(postsDir, {
    encoding: 'utf-8',
    recursive: true,
  })

  return (
    await Promise.all(
      files
        .filter((fn) => fn.match(/\.md$/))
        .map(async (fn) => ({
          contents: await readFile(`${postsDir}/${fn}`, utf8),
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
