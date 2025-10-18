import { DurableObject, WorkerEntrypoint } from 'cloudflare:workers'
import { ImageResponse } from 'workers-og'
import { createHtml } from './lib/createHtml'
import { getFontCollection, type Font } from './lib/getFontCollection'
import type { PostImagesInterface } from './lib/PostImagesInterface'

export class OgImageGeneratorStore extends DurableObject<Env> {
  fonts: Font[] | null = null

  async getFont() {
    if (!this.fonts) {
      this.fonts = await getFontCollection()
    }

    return this.fonts
  }
}
export default class WorkerB extends WorkerEntrypoint implements PostImagesInterface {
  // Currently, entrypoints without a named handler are not supported
  async fetch() {
    return new Response(null, { status: 404 })
  }

  async getImageResponse(title: string) {
    const doStore = this.env.DO_OG_IMAGE_STORE.getByName('resources')

    return new ImageResponse(createHtml({ title }), {
      width: 1200,
      height: 630,
      format: 'png',
      fonts: await doStore.getFont(),
    })
  }
}
