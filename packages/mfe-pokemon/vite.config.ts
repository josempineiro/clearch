import { defineConfig } from 'vite'
import * as path from 'node:path'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remotePokemon',
      filename: 'remotePokemon.js',
      exposes: {
        './Pokemons': './src/modules/Pokemons',
      },
      shared: ['react', 'react-dom', 'react-router-dom', { 'shared-lib': { packagePath: 'shared-lib' } }],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
})
