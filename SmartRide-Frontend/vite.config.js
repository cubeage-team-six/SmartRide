import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: [
      { find: /^react-native$/, replacement: 'react-native-web' },
    ],
    extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      loader: {
        '.js': 'jsx'
      }
    }
  }
});
