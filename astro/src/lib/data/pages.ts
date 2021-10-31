export interface Page {
  slug: string
  shortTitle: string
  title: string
}

export const pages: Page[] = [
  {
    slug: 'archive',
    shortTitle: 'Blog archive',
    title: 'Blog archive',
  },
  {
    slug: 'about',
    shortTitle: 'About',
    title: 'Legend of the fountain of wisdom',
  },
]
