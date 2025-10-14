import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { getAllPosts } from '@arnorhs/posts'
import fs from 'fs/promises'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  site: 'https://arnorhs.dev',

  integrations: [
    sitemap(),
    {
      name: 'redirects',
      hooks: {
        'astro:build:done': async ({ dir, routes }) => {
          const str = getAllPosts()
            .map((post) => `/${post.slug} /posts/${post.uriId} 301`)
            .join('\n')
          await fs.writeFile(`${dir.pathname}_redirects`, str, 'utf8')
          console.log('Wrote redirects to _redirects')
        },
      },
    },
  ],

  vite: {
    plugins: [
      // @ts-expect-error - I don't know why
      tailwindcss({
        content: [
          './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
          // Add any other paths where you use Tailwind classes
        ],
      }),
      // @ts-expect-error
      viteStaticCopy({
        targets: [
          {
            src: '../resoc/dist/og-image/*.*',
            dest: 'og-image',
          },
        ],
      }),
    ],
  },

  adapter: cloudflare({
    // platformProxy: {
    //   enabled: true,
    // },
  }),
})
