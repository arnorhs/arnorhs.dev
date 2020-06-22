import { findPost } from '../../../posts'

export async function get (req, res, next) {
  const { permalink } = req.params

  const post = findPost(permalink)

  if (post !== null) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(post))
  } else {
    next()
  }
}
