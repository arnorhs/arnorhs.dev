import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  // projectRoot: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
  // pages: './src/pages', // Path to Astro components, pages, and data
  // dist: './dist',       // When running `astro build`, path to final static output
  // public: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
  site: 'https://arnorhs.dev',
  integrations: [
    sitemap(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
  ],
})
