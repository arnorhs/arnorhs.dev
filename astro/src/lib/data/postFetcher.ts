import allPosts from '$/gen/allPosts.json'
import { groupBy } from '../utils'

export type Meta = Record<string, string>

export interface Post {
  urlSlug: string
  url: string
  html: string
  permalink: string
  date: Date
  meta: Meta
}

const processPost = (item: Record<string, unknown>): Post => {
  return {
    url: `/posts/${item.urlSlug}`,
    urlSlug: item.urlSlug as string,
    date: new Date(item.date as string),
    html: item.html as string,
    permalink: item.permalink as string,
    meta: item.meta as Meta,
  }
}

export const findPost = async (permalink: string): Promise<Post | null> => {
  return processPost(allPosts.find((x) => x.permalink === permalink))
}

export const getAllGroupedPosts = async (): Promise<{ year: string; posts: Post[] }[]> => {
  const groupedPosts = allPosts.map(processPost).reduce(
    groupBy((post) => post.date.getFullYear()),
    {} as Record<string, Post[]>,
  )

  const posts = Object.entries(groupedPosts)
    .map(([key, value]) => ({
      year: key,
      posts: value,
    }))
    .sort(({ year: a }, { year: b }) => {
      return parseInt(b, 10) - parseInt(a, 10)
    })

  return posts
}

export const getAllPosts = async (): Promise<Post[]> => allPosts.map(processPost)
