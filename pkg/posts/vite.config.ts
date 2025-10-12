/// <reference types="vitest" />
import { nodeExternals } from 'rollup-plugin-node-externals'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { getPostCollection } from './src/build/getPostCollection'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'posts',
      formats: ['es', 'cjs'],
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
  plugins: [
    {
      name: 'posts:json',
      resolveId: (id) => {
        if (id === 'posts:json') {
          return id
        }
      },
      load: async (id) => {
        if (id === 'posts:json') {
          const items = await getPostCollection()
          return `export default ${JSON.stringify(items, undefined, '\t')}`
        }
      },
    },
    // {
    //   name: 'post-export',
    //   generateBundle: async function () {
    //     const items = await getPostCollection()

    //     this.emitFile({
    //       type: 'asset',
    //       fileName: 'posts.json',
    //       source: JSON.stringify(items),
    //     })
    //   },
    // },
    nodeExternals(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
      exclude: ['node_modules', 'dist', '**/*.test.ts'],
    }),
  ],
})
