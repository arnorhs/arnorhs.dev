import { getAllPosts, type PostWithUrl } from '@arnorhs/posts'

const POSTS_PER_PAGE = 20

export function getPaginatedPosts() {
  return getAllPosts().reduce((acc, item, index) => {
    const chunkIndex = Math.floor(index / POSTS_PER_PAGE)

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []
    }

    acc[chunkIndex].push(item)

    return acc
  }, [] as PostWithUrl[][])
}
