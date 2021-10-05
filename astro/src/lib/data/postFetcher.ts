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
  const item = await fetch(`http://localhost:1337/post/${permalink}`).then((res) => res.json())

  return processPost(item)
}

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await fetch(`http://localhost:1337/posts`).then((res) => res.json())

  return posts.map(processPost)
}
