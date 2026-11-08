import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ponta-farm.github.io',
  base: '/experience-guide',
  output: 'static',
  build: {
    inlineStylesheets: 'never',
  },
});
