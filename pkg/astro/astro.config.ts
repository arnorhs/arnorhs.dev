import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  site: import.meta.env.DEV
    ? 'http://localhost:4321'
    : process.env.ASTRO_SITE_URL || 'https://arnorhs.dev',

  integrations: [sitemap()],

  vite: {
    build: {
      minify: false,
    },
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    cloudflareModules: true,
  }),
})
