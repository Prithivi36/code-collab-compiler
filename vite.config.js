import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // global:'window',
  plugins: [react()],
  server:{
    port:80
  }
})
