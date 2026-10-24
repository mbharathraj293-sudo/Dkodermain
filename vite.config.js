import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-bundle';
          }
          if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
            return 'animation-bundle';
          }
        }
      }
    }
  }
});
