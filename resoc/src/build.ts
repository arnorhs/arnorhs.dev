import { getPostCollection, Post } from '@arnorhs/posts'
import { compileLocalTemplate } from '@resoc/create-img'
import { resolve } from 'path'
import { mkdir, access } from 'fs/promises'
import { existsSync } from 'fs'
import { Templatable } from './types'
import { colorize, ConsoleColor } from './util'

const compileTemplate = async (imgUrl, title: string) => {
  await compileLocalTemplate(
    resolve(__dirname, './../default/resoc.manifest.json'),
    {
      title,
    },
    {
      width: 1200,
      height: 630,
    },
    imgUrl,
  )
}

export const build = async () => {
  const collection = await getPostCollection()

  const ogDir = resolve(__dirname, '../../astro/dist/og-image')
  try {
    await mkdir(ogDir)
  } catch {}

  const postTemplates = collection.allItems().map(
    (post: Post) =>
      ({
        filename: post.contentHash,
        title: post.meta.title,
      } as Templatable),
  )

  const yellow = colorize(ConsoleColor.FgYellow)
  const green = colorize(ConsoleColor.FgGreen)

  for (const tpl of postTemplates) {
    const filename = `${tpl.filename}.jpg`
    const imgPath = `${ogDir}/${filename}`
    const exists = existsSync(imgPath)
    if (exists) {
      console.log('Cached ', green(tpl.title), `(${filename})`)
    } else {
      console.log('Compiling', yellow(tpl.title), `(${filename})`)
      await compileTemplate(imgPath, tpl.title)
    }
  }
}
