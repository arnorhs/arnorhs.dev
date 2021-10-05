import { MdFile, Meta, Post } from '../types'

// function for reshaping each post
export const transformMd = ({ filename, html, metadata }: MdFile): Post => {
  // the permalink is the filename with the '.md' ending removed
  const permalink = filename.replace(/\.md$/, '')

  // convert date string into a proper `Date`
  const date = new Date(metadata.date)
  const dateStr = date.toISOString().substring(0, 10)

  const urlSlug = `${dateStr}/${permalink}`

  // return the new shape
  return { meta: metadata, urlSlug, html, permalink, date }
}
