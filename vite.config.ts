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
      '@types': '/src/types',
      '@mock': '/mock',
    },
  },
  server: {
    host: `0.0.0.0`,
    port: 5173,
    https: false,
    proxy: {
      '/api': {
        target: `http://localhost:9999/api`,
        changeOrigin: true,
        rewrite: (route) => route.replace(/^\/api/, ''),
      },
      '/test': {
        target: `http://localhost:9999/test`,
        changeOrigin: true,
        rewrite: (route) => route.replace(/^\/test/, 't'),
      },
    },
  },
  define: {
    'process.env': {},
  },
});
