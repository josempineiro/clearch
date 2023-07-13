import react from '@vitejs/plugin-react'
import * as path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import { UserConfigExport } from 'vite'

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    css: {
      modules: {
        generateScopedName: (name, filename, css) => {
          const component = filename.split(/\//g).reverse()[0].split('.')[0]
          return ['ui', [...new Set([component, name])].join('_')].join('-')
        },
      },
      postcss: {
        plugins: [],
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'clearqui',
        formats: ['es', 'umd'],
        fileName: (format) => `clearqui.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  })
}
// https://vitejs.dev/config/
export default app
