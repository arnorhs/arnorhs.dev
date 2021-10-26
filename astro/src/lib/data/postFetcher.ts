import allPosts from '$/gen/allPosts.json'

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

export const getAllPosts = async (): Promise<Post[]> => {
  return allPosts.map(processPost)
}
