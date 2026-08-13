import { findPost } from '@arnorhs/posts'
import { env } from 'cloudflare:workers'
import type { APIContext } from 'astro'
import type { PostImagesInterface } from '@arnorhs/post-images-worker'

export const prerender = false

export async function GET({ params }: APIContext) {
  const contentHash = params.contentHash

  if (!contentHash) {
    return new Response('Not Found', { status: 404 })
  }

  const rateLimit = await env.RATE_LIMIT.limit({
    key: contentHash,
  })

  if (!rateLimit.success) {
    return new Response('Rate limit exceeded', { status: 429 })
  }

  const title = titleForContentHash(contentHash)

  if (!title) {
    console.warn('No post found for hash', { contentHash })
    return new Response('Not Found', { status: 404 })
  }

  const postImagesWorker = env.POST_IMAGES_WORKER as unknown as PostImagesInterface
  const resp = await postImagesWorker.getImageResponse(title)

  // I needed to clone it, because astro complained that it was not a response, even though
  // it was a response, it was just not an instance of the same response, because it comes
  // from cloudflare's rpc protocol
  return new Response(resp.body)
}

function titleForContentHash(contentHash: string) {
  if (contentHash === 'default') {
    return "Arnor's blog and stuff"
  }

  const post = findPost((p) => p.contentHash === contentHash)

  if (!post) {
    return null
  }

  return post.title
}
