import { getPostCollection, Post } from '@arnorhs/posts'
import { compileLocalTemplate } from '@resoc/create-img'
import { resolve } from 'path'
import { mkdir } from 'fs/promises'

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

  // todo: config or variable
  const posts = collection.allItems()
  for (const post of posts) {
    const imgPath = `${ogDir}/${post.permalink}.jpg`
    console.log('compiling ', imgPath, post.meta.title)
    await compileTemplate(imgPath, post.meta.title)
  }
}
