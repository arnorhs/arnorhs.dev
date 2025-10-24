import allPosts from 'posts:json'
import { groupBy } from './utils'
import type { Post, PostGroup, PostWithUrl } from './types'

const processPost = (item: Post): PostWithUrl => ({
  ...item,
  publishedDate: new Date(item.publishedDate),
  url: `/posts/${item.uriId}`,
})

export function findPost(slug: string): PostWithUrl | null
export function findPost(
  predicate: (post: { contentHash: string; slug: string }) => boolean,
): PostWithUrl | null
export function findPost(cond: Function | string): PostWithUrl | null {
  const post = allPosts.find(
    typeof cond === 'function'
      ? (cond as (post: { contentHash: string; slug: string }) => boolean)
      : (x) => x.slug === cond,
  )

  if (!post) {
    return null
  }

  return processPost(post as Post)
}

export function groupPosts(posts: Post[]): PostGroup[] {
  const groupedPosts = posts.map(processPost).reduce(
    groupBy<PostWithUrl>((post) => new Date(post.publishedDate).getFullYear()),
    {} as Record<string, PostWithUrl[]>,
  )

  const taggedPosts = Object.entries(groupedPosts)
    .map<PostGroup>(([year, posts]) => ({ year, posts }))
    .sort(({ year: a }, { year: b }) => {
      return Number(b) - Number(a)
    })

  return taggedPosts
}

export const getAllPosts = () => allPosts.map(processPost)

export const getFeaturedPost = () => processPost(allPosts[0])
