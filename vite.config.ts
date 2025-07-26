import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // اضافه کردن path برای __dirname

export default defineConfig({
  base: '/RestaurantOnline/', // مسیر درست برای GitHub Pages
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.jpg', '**/*.png', '**/*.svg'], // فرمت‌های تصاویر
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@locales': path.resolve(__dirname, 'src/locales'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@assets/fonts/fonts.css";`,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    assetsDir: 'assets',
  },
});