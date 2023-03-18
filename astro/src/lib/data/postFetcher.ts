import type { Post } from '@arnorhs/posts'
import allPosts from '../../gen/allPosts.json'
import { groupBy } from '../utils/misc'

export type PostWithUrl = Post<'fromJs'> & { url: string }

const processPost = (item: Post<'fromJson'>): PostWithUrl => ({
  ...item,
  publishedDate: new Date(item.publishedDate),
  url: `/posts/${item.uriId}`,
})

export const findPost = async (permalink: string): Promise<PostWithUrl | null> => {
  const post = allPosts.find((x) => x.slug === permalink)
  if (!post) {
    return null
  }

  return processPost(post as Post<'fromJson'>)
}

export interface PostGroup {
  year: string
  posts: PostWithUrl[]
}

export const getAllGroupedPosts = async (): Promise<PostGroup[]> => {
  const groupedPosts = allPosts.map(processPost).reduce(
    groupBy((post) => post.publishedDate.getFullYear()),
    {} as Record<string, PostWithUrl[]>,
  )

  const posts = Object.entries(groupedPosts)
    .map(
      ([key, value]) =>
        ({
          year: key,
          posts: value,
        } as PostGroup),
    )
    .sort(({ year: a }, { year: b }) => {
      return parseInt(b, 10) - parseInt(a, 10)
    })

  return posts
}

export const getAllPosts = () => allPosts.map(processPost)

export const getFeaturedPost = () => processPost(allPosts[0])
