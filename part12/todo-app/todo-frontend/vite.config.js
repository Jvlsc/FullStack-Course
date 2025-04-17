import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js']
  },
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173
  },
})
