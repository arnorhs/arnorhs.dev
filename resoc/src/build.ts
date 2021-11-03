import { getPostCollection, Post } from '@arnorhs/posts'
import { compileLocalTemplate } from '@resoc/create-img'
import { resolve } from 'path'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { Templatable } from './types'
import { colorize, ConsoleColor } from './util'

const yellow = colorize(ConsoleColor.FgYellow)
const green = colorize(ConsoleColor.FgGreen)
const red = colorize(ConsoleColor.FgRed)

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
  if (!process.env.TARGET_DIR) {
    throw new Error('TARGET_DIR environment variable must be set')
  }
  const collection = await getPostCollection()

  const ogDir = resolve(process.cwd(), '..', process.env.TARGET_DIR)
  try {
    await mkdir(ogDir, { recursive: true })
    console.log('Created directory: ', green(ogDir))
  } catch {
    console.error('Could not create directory: ', red(ogDir))
  }

  const postTemplates: Templatable[] = collection.allItems().map(
    (post: Post) =>
      ({
        filename: post.contentHash,
        title: post.meta.title,
      } as Templatable),
  )

  postTemplates.push({
    title: "Arnor's blog and stuff",
    filename: 'default',
  })

  for (const tpl of postTemplates) {
    const filename = `${tpl.filename}.jpg`
    const imgPath = `${ogDir}/${filename}`
    if (existsSync(imgPath)) {
      console.log('Cached ', green(tpl.title), `(${filename})`)
    } else {
      console.log('Compiling', yellow(tpl.title), `(${filename})`)
      await compileTemplate(imgPath, tpl.title)
    }
  }
}
