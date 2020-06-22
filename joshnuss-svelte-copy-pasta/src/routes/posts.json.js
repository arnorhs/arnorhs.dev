import { posts } from '../posts'

export async function get (req, res) {
  const simplePosts = posts.map(({ url, title, date, summary }) => ({
    url,
    title,
    date,
    summary
  }))

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(simplePosts))
}
