export type RandomShi = Record<string, string>

export interface MdFile {
  filename: string
  html: string
  metadata: RandomShi
}

export interface WpPost {
  post_date: string
  post_content: string
  post_excerpt: string
  post_title: string
  post_status: string
  post_name: string
  post_modified: string
  post_type: string

  pinged: string
  post_mime_type: string
  ID: number
  post_author: number
  post_content_filtered: string
  comment_count: number
  comment_status: string
  menu_order: number
  post_date_gmt: string
  post_password: string
  ping_status: string
  post_modified_gmt: string
  post_parent: number
  guid: string
  to_ping: string
}

export interface Post<T extends 'fromJson' | 'fromJs' = 'fromJs'> {
  uriId: string
  title: string
  summary: string
  htmlBody: string
  slug: string
  publishedDate: T extends 'fromJson' ? string : Date
  contentHash: string
  meta?: RandomShi
}
