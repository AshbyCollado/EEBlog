import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import siteConfig from './src/data/site-config';

import svelte from '@astrojs/svelte';

export default defineConfig({
  site: siteConfig.website,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    mdx(),
    sitemap(),
    svelte({
      experimental: {
        async: true
      }
    })
  ],
  adapter: netlify()
});