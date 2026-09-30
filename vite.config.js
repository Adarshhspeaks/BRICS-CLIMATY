import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404-fallback',
      closeBundle() {
        const distIndex = path.resolve(__dirname, 'dist', 'index.html');
        const dist404 = path.resolve(__dirname, 'dist', '404.html');
        if (fs.existsSync(distIndex)) {
          fs.copyFileSync(distIndex, dist404);
        }
      }
    }
  ],
  server: {
    port: 3000,
    host: true
  }
});
