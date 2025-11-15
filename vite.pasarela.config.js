import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  server: {
    port: 5173,
    open: true,
    cors: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html'
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@services': '/src/services',
      '@utils': '/src/utils',
      '@config': '/src/config'
    }
  }
});

