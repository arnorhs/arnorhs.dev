import { DurableObject } from 'cloudflare:workers'
import { findPost } from '@arnorhs/posts'
import { ImageResponse, loadGoogleFont } from 'workers-og'
import { createHtml } from './lib/createHtml'
import { getFontCollection, type Font } from './lib/getFontCollection'

export class OgImageGeneratorStore extends DurableObject<Env> {
  fonts: Font[] | null = null

  async getFont() {
    if (!this.fonts) {
      this.fonts = await getFontCollection()
    }

    return this.fonts
  }
}

const pathRegex = /^\/(?<contentHash>[a-zA-Z0-9]+)\.png$/

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const pathname = new URL(request.url).pathname

    const contentHash = pathname.match(pathRegex)?.groups?.contentHash

    if (!contentHash) {
      console.warn('no contentHash found in path', { pathname })
      return new Response('Not Found', { status: 404 })
    }

    const rateLimit = await env.RATE_LIMIT.limit({
      key: contentHash,
    })

    if (!rateLimit.success) {
      return new Response('Rate limit exceeded', { status: 429 })
    }

    const post = findPost((p) => p.contentHash === contentHash)

    if (!post) {
      console.warn('No post found for hash', { contentHash })
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
