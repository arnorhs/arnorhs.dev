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
    plugins: [
      // @ts-expect-error - I don't know why
      tailwindcss({
        content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
      }),
    ],
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    cloudflareModules: true,
  }),
})
