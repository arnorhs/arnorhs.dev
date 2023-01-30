import { getPostCollection, Post } from '@arnorhs/posts'
import { compileLocalTemplate, compileTemplate } from '@resoc/create-img'
import { resolve } from 'path'
import { mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { Templatable } from './types'
import { colorize, ConsoleColor } from './util'

const yellow = colorize(ConsoleColor.FgYellow)
const green = colorize(ConsoleColor.FgGreen)
const red = colorize(ConsoleColor.FgRed)

const DEBUG = !!process.env.DEBUG
const TARGET_DIR = DEBUG ? '.' : process.env.TARGET_DIR
if (!TARGET_DIR) {
  throw new Error('TARGET_DIR environment variable must be set when not in debug mode')
}

const ogDir = resolve(process.cwd(), '..', TARGET_DIR)

const compileTemplateWithData = async (imgUrl, title: string) => {
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

  try {
    await mkdir(ogDir, { recursive: true })
    console.log('Created directory: ', green(ogDir))
  } catch {
    console.error('Could not create directory: ', red(ogDir))
  }

  const postTemplates: Templatable[] = collection
    .allItems()
    .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
    .map(
      (post: Post) =>
        ({
          filename: post.contentHash,
          title: post.meta.title,
        } as Templatable),
    )
    // only take the first one in debug mode
    .filter((x, i) => (DEBUG ? i === 0 : true))

  postTemplates.push({
    title: "Arnor's blog and stuff",
    filename: 'default',
  })

  for (const tpl of postTemplates) {
    const filename = `${tpl.filename}.jpg`
    const imgPath = `${ogDir}/${filename}`
    if (!DEBUG && existsSync(imgPath)) {
      console.log('Cached ', green(tpl.title), `(${imgPath})`)
    } else {
      console.log('Compiling', yellow(tpl.title), `(${imgPath})`)
      await compileTemplateWithData(imgPath, tpl.title)
    }
  }
}
