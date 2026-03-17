import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

function mimeTypePlugin() {
  return {
    name: 'fix-mime-types',
    apply: 'serve' as const,
    configureServer(server: any) {
      return () => {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (req.url) {
            if (req.url.endsWith('.ts') || req.url.endsWith('.tsx') || 
                req.url.endsWith('.js') || req.url.endsWith('.jsx')) {
              res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            } else if (req.url.endsWith('.css')) {
              res.setHeader('Content-Type', 'text/css; charset=utf-8');
            }
          }
          next();
        });
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mimeTypePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/',
  server: {
    // https: {
    //   key: './localhost+1-key.pem',
    //   cert: './localhost+1.pem',
    // },
    host: '0.0.0.0',
  },
})
