import rss from '@astrojs/rss'
import { getAllPosts } from 'src/lib'

const posts = await getAllPosts()

export const get = () =>
  rss({
    title: 'arnorhs blog - arnorhs.dev',
    description: 'The blog of arnorhs - the legendary no-stack developer',
    site: import.meta.env.SITE,
    // list of `<item>`s in output xml
    // simple example: generate items for every md file in /src/pages
    // see "Generating items" section for required frontmatter and advanced use cases
    items: posts.map((post) => ({
      link: post.uriId,
      title: post.title,
      description: post.summary,
      pubDate: post.publishedDate,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  })
