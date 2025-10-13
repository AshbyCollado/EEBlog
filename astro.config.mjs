import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import siteConfig from './src/data/site-config';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.website,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx(),
    sitemap(),
    svelte({
      experimental: {
        async: true,
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
    },
  },
  adapter: netlify(),
});