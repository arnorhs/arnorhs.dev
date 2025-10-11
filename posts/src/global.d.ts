declare module 'posts:json' {
  export type CompiledPost = {
    uriId: string
    title: string
    summary: string
    htmlBody: string
    slug: string
    publishedDate: string | Date
    contentHash: string
    meta?: Record<string, string>
  }

  const files: CompiledPost[]

  export default files
}
