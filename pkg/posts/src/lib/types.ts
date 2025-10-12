export type PostWithUrl = Post & { url: string }

export interface PostGroup {
  year: string
  posts: PostWithUrl[]
}

export type Post = {
  uriId: string
  title: string
  summary: string
  htmlBody: string
  slug: string
  publishedDate: string | Date
  contentHash: string
  meta?: Record<string, string>
}
