import type { Post } from '../lib/types'
import { getMarkdownPosts } from './getMarkdownPosts'
import { sortBy } from './sortBy'

export async function getPostCollection(postsDir: string): Promise<Post[]> {
  return (await getMarkdownPosts(postsDir)).sort(sortBy<{}>('publishedDate', 'desc'))
}
