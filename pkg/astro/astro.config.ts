import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  site: 'https://arnorhs.dev',

  integrations: [sitemap()],

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
    platformProxy: {
      enabled: true,
    },
  }),
})
