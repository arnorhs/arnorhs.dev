import { getAllPosts, type Post } from '@arnorhs/posts'
import { compileLocalTemplate } from '@resoc/create-img'
import { existsSync } from 'fs'
import { mkdir } from 'fs/promises'
import { resolve } from 'path'
import { Templatable } from './types'
import { colorize, ConsoleColor } from './util'

const yellow = colorize(ConsoleColor.FgYellow)
const green = colorize(ConsoleColor.FgGreen)
const red = colorize(ConsoleColor.FgRed)

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

export const build = async (DEBUG: boolean, dest: string) => {
  const ogDir = resolve(process.cwd(), dest)

  await mkdir(ogDir, { recursive: true })
  const allItems = getAllPosts()

  try {
    await mkdir(ogDir, { recursive: true })
    console.log('Created directory: ', green(ogDir))
  } catch {
    console.error('Could not create directory: ', red(ogDir))
  }

  const postTemplates: Templatable[] = allItems
    .map(
      (post: Post) =>
        ({
          filename: post.contentHash,
          title: post.title,
        }) as Templatable,
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
