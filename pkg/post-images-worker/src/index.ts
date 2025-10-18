import { DurableObject } from 'cloudflare:workers'
import { findPost } from '@arnorhs/posts'
import { ImageResponse, loadGoogleFont } from 'workers-og'
import { createHtml } from './lib/createHtml'
import { getFont, type Font } from './lib/getFont'

export class OgImageGeneratorStore extends DurableObject<Env> {
  font: { normal: Font; bold: Font } | null = null

  async getFont() {
    if (!this.font) {
      console.log('no font, fetching font...')

      // Note: I was unable to make it target the right font weight
      // when this had the same name...
      this.font = {
        normal: await getFont('figtree-regular', 'Figtree', 400),
        bold: await getFont('figtree-bold', 'Figtree', 700),
      }
    }

    return [this.font.normal, this.font.bold]
  }
}

const pathRegex = /^\/(?<contentHash>[a-zA-Z0-9]+)\.png$/

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const pathname = new URL(request.url).pathname

    const rateLimit = await env.RATE_LIMIT.limit({
      key: pathname,
    })

    if (!rateLimit.success) {
      return new Response('Rate limit exceeded', { status: 429 })
    }

    const postHash = pathname.match(pathRegex)?.groups?.contentHash

    if (!postHash) {
      console.warn('no post hash found in path', { pathname })
      return new Response('Not Found', { status: 404 })
    }

    const post = findPost((p) => p.contentHash === postHash)

    if (!post) {
      console.warn('No post found for hash', { postHash })
      return new Response('Not Found', { status: 404 })
    }

    const doStore = env.DO_OG_IMAGE_STORE.getByName('resources')

    return new ImageResponse(createHtml({ title: post.title }), {
      width: 1200,
      height: 630,
      format: 'png',
      fonts: await doStore.getFont(),
    })
  },
} satisfies ExportedHandler<Env>
