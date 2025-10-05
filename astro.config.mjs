// @ts-check
import { defineConfig } from 'astro/config';
import { resolve } from 'path';

export default defineConfig({
  site: 'https://grigori.konopelko.com/',
  base: '/',
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: {
        '@assets': resolve('./src/assets'),
      },
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
