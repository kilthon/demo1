import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: [
        'src/**/*.js',
        'src/**/*.ts',
        'src/**/*.vue',
        'src/*.js',
        'src/*.ts',
        'src/*.vue',
        'mock/*.ts',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@views': '/src/views',
      '@mock': '/mock',
      '@store': '/src/store',
      '@cmp': '/src/components',
    },
  },
  server: {
    host: `0.0.0.0`,
    port: 5173,
    https: false,
    proxy: {
      '/api': {
        target: `http://localhost:9999/`,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '');
        },
      },
      '/test': {
        target: `http://localhost:9999/`,
        changeOrigin: true,
        rewrite: (route) => {
          return route.replace(/^\/test/, '');
        },
      },
      '/prod': {
        target: `http://localhost:9999/`,
        changeOrigin: true,
        rewrite: (route) => {
          return route.replace(/^\/prod/, '');
        },
      },
    },
  },
  define: {
    'process.env': {},
  },
  css: {
    preprocessorOptions: {
      less: {
        javaScrirptEnabled: true,
      },
    },
  },
});
