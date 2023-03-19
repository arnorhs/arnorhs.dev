import md5 from 'md5'
import { MdFile, Post } from '../types'

// function for reshaping each post
export const transformMd = ({
  filename,
  html,
  metadata: { summary, title, date },
}: MdFile): Post => {
  // the permalink is the filename with the '.md' ending removed
  const permalink = filename.replace(/\.md$/, '')

  // convert date string into a proper `Date`
  const publishedDate = new Date(date)
  const dateStr = publishedDate.toISOString().substring(0, 10)

  const urlSlug = `${dateStr}/${permalink}`

  const contentHash = md5(`design-v2-${permalink}:${title}`)

  // return the new shape
  return {
    uriId: urlSlug,
    htmlBody: html,
    slug: permalink,
    publishedDate,
    contentHash,
    title,
    summary,
  }
}
