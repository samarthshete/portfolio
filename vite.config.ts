import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  base: '/portfolio/', 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,       // 0.0.0.0 (LAN)
    port: 3000,
    strictPort: true, // fail if 3000 is taken (don’t auto-increment)
    // allowedHosts: ❌ (not a Vite option)
  },
})
