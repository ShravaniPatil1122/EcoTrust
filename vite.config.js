import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(process.env.HTTPS === 'true' || process.argv.includes('--https')
      ? [basicSsl()]
      : []),
  ],
  server: {
    host: true, // Exposes server to local network (0.0.0.0) for easy mobile testing
    port: 5173,
  },
})
