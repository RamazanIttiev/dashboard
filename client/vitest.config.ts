import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@stores': '/src/stores',
      '@services': '/src/services',
      '@constants': '/src/constants',
    },
  },
});
