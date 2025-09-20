import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',
  server: {
    https: {
      key: './localhost+1-key.pem',
      cert: './localhost+1.pem',
    },
    host: '0.0.0.0',
  },
})
