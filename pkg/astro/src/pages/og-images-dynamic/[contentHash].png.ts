import { findPost } from '@arnorhs/posts'
import type { APIContext } from 'astro'
import { ImageResponse } from 'workers-og'
import { createHtml } from '../../lib/ogImageGeneration/createHtml'
import type { OgImageGeneratorStore } from '../../worker'

export const prerender = false

export async function GET({ request, params, locals }: APIContext) {
  const contentHash = params.contentHash

  console.log('Generating OG image for hash:', contentHash)

  if (!contentHash) {
    return new Response('Not Found', { status: 404 })
  }

  const rateLimit = await locals.runtime.env.RATE_LIMIT.limit({
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

  const doStore = locals.runtime.env.DO_OG_IMAGE_STORE.getByName(
    'resources',
  ) as DurableObjectStub<OgImageGeneratorStore>

  return new ImageResponse(createHtml({ title: post.title }), {
    width: 1200,
    height: 630,
    format: 'png',
    fonts: await doStore.getFont(),
  })
}
