import md5 from 'md5'
import type { Post } from '../lib/types'

export interface MdFile {
  filename: string
  html: string
  metadata: Record<string, string>
}

// function for reshaping each post
export const transformMd = ({
  filename,
  html,
  metadata: { summary, title, date },
}: MdFile): Post => {
  // the slug is the filename with the '.md' ending removed
  const slug = filename.replace(/\.md$/, '').toLocaleLowerCase()

  // convert date string into a proper `Date`
  const publishedDate = new Date(date)
  const dateStr = publishedDate.toISOString().substring(0, 10)

  const uriId = `${dateStr}/${slug}`

  const contentHash = md5(`design-v2-${slug}:${title}`)

  // return the new shape
  return {
    uriId,
    htmlBody: html,
    slug,
    publishedDate,
    contentHash,
    title,
    summary,
  }
}
