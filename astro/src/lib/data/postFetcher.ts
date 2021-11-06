import type { Post } from '@arnorhs/posts'
import allPosts from '../../gen/allPosts.json'
import { groupBy } from '../utils/misc'

export type Meta = Record<string, string>

const processPost = (item: Record<string, unknown>): Post => ({
  url: `/posts/${item.urlSlug}`,
  urlSlug: item.urlSlug as string,
  date: new Date(item.date as string),
  html: item.html as string,
  permalink: item.permalink as string,
  meta: item.meta as Meta,
  contentHash: item.contentHash as string,
})

export const findPost = async (permalink: string): Promise<Post | null> => {
  const post = allPosts.find((x) => x.permalink === permalink)
  if (!post) {
    return null
  }
  return processPost(post)
}

export interface PostGroup {
  year: string
  posts: Post[]
}

export const getAllGroupedPosts = async (): Promise<PostGroup[]> => {
  const groupedPosts = allPosts.map(processPost).reduce(
    groupBy((post) => post.date.getFullYear()),
    {} as Record<string, Post[]>,
  ) as Record<string, Post[]>

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

export const getAllPosts = async (): Promise<Post[]> => allPosts.map(processPost)

export const getFeaturedPost = async (): Promise<Post> => processPost(allPosts[0])
