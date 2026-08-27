import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), imagetools()],
})
