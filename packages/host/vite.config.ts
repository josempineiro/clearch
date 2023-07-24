import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'hostApp',
      remotes: {
        remotePokemon: 'http://localhost:5002/assets/remotePokemon.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', { 'shared-lib': { version: '2.0.0' } }],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
