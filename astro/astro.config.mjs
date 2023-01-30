import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import allPosts from './src/gen/allPosts.json'
import fs from 'fs/promises'

// https://astro.build/config
export default defineConfig({
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  site: 'https://arnorhs.dev',
  integrations: [
    sitemap(),
    tailwind(),
    {
      name: 'redirects',
      hooks: {
        'astro:build:done': async ({ dir, routes }) => {
          const str = allPosts
            .map((post) => `/${post.permalink} /posts/${post.urlSlug} 301`)
            .join('\n')
          await fs.writeFile(`${dir.pathname}_redirects`, str, 'utf8')
          console.log('Wrote redirects to _redirects')
        },
      },
    },
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.endsWith('.css')) {
              return 'styles'
            }
          },
        },
      },
    },
  },
})
