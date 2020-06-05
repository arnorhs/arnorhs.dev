import all from '../../posts/*.md'

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

// provide a way to find a post by permalink
export const findPost = permalink => {
  // use lodash to find by field name:
  return posts.find(post => post.permalink === permalink)
}

export const posts = all.map(transform).sort(orderBy('date', 'desc'))
