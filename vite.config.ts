import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'GEMINI_', 'OPEN_ROUTER_', 'GROQ_', 'OPENAI_'],
})
