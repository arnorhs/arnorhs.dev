import { WorkerEntrypoint } from 'cloudflare:workers'
import { ImageResponse } from 'workers-og'
import { createHtml } from './lib/createHtml'

export default class WorkerB extends WorkerEntrypoint {
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
