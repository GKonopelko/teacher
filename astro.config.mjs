// @ts-check
import { defineConfig } from 'astro/config';
import { resolve } from 'path';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://grigori.konopelko.com/',
  base: '/',
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: {
        '@assets': resolve('./src/assets'),
        '@scripts': resolve('./src/scripts'),
      },
    },
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  integrations: [react()],
  output: 'server',
});
