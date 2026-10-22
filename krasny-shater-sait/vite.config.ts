import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' so the site works from a sub-path like /threads-media/ on GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
