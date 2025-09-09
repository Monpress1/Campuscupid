import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: './index.html', // ensures Vite uses index.html at root
    },
  },
});
