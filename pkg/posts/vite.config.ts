/// <reference types="vitest/config" />
import { nodeExternals } from 'rollup-plugin-node-externals'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { getPostCollection } from './src/build/getPostCollection'
import path from 'node:path'

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
          const items = await getPostCollection(path.resolve(process.cwd(), '../../content'))
          return `export default ${JSON.stringify(items, undefined, '\t')}`
        }
      },
    },
    nodeExternals(),
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
      exclude: ['node_modules', 'dist', '**/*.test.ts'],
    }),
  ],
})
