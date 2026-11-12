import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://rx2600.com',
  output: 'static',
  build: {
    assets: 'therapy/_astro',
  },
});
