import all from '../../posts/*.md'
import legacyPosts from '../../posts/wpposts.json'

// function for reshaping each post
const transform = ({ filename, html, metadata }) => {
  // the permalink is the filename with the '.md' ending removed
  const permalink = filename.replace(/\.md$/, '')

  // convert date string into a proper `Date`
  const date = new Date(metadata.date)
  const dateStr = date.toISOString().substring(0, 10)

  const url = `/posts/${dateStr}/${permalink}`

  // return the new shape
  return { ...metadata, url, filename, html, permalink, date }
}

const orderBy = (field, direction = 'asc') => {
  const dir = direction === 'asc' ? 1 : -1

  return (a, b) => {
    const av = a[field]
    const bv = b[field]

    const type = typeof av

    if (type !== typeof bv) {
      throw new TypeError(
        'all fields of the same name passed into orderBy ' +
          'must be of the same type'
      )
    }

    if (type === 'number') {
      return (av - bv) * dir
    }

    if (type === 'string') {
      return av.localeCompare(bv) * dir
    }

    if (av instanceof Date) {
      return (av - bv) * dir
    }

    throw new TypeError(
      `orderby - only string and number values are supported, got '${JSON.stringify(
        av
      )}'`
    )
  }
}

const legacyTransform = o => {
  const {
    post_date: publishedDate,
    post_content: postContent,
    post_excerpt: summary,
    post_title: title,
    post_status: status,
    post_name: permalink,
    post_modified: modifiedDate
  } = o

  const html = fromWordPressHtml(postContent)

  const metaData = {
    modifiedDate,
    status,
    summary,
    title
  }

  const date = new Date(publishedDate)
  const dateStr = date.toISOString().substring(0, 10)

  const url = `/posts/${dateStr}/${permalink}`

  return { ...metaData, url, html, permalink, date }
}

const fromWordPressHtml = postContent => {
  // WP's post content comes with newlines for paragraphs
  return postContent
    .split(/\n\n|\r\n\r\n/)
    .map(s => `<p>${s}</p>`)
    .join('\n')
    .replace(/http:\/\//g, 'https://')
}

export const posts = [
  ...all.map(transform),
  ...legacyPosts
    .filter(p => p.post_type === 'post' && p.post_status === 'publish')
    .map(legacyTransform)
].sort(orderBy('date', 'desc'))

// provide a way to find a post by permalink
export const findPost = permalink => {
  // use lodash to find by field name:
  return posts.find(post => post.permalink === permalink)
}
