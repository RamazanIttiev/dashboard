import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), solidPlugin(), tailwindcss()],
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  server: {
    port: 3001,
  },
  build: {
    target: 'esnext',
  },
});
