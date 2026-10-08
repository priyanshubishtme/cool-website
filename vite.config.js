import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/@dimforge/rapier3d-compat/')) return 'physics';
          if (id.includes('/node_modules/three/')) return 'three';
        },
      },
    },
  },
});
