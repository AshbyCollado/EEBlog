import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import siteConfig from './src/data/site-config';

export default defineConfig({
  site: siteConfig.website,

  experimental: {
    session: true, // ✅ enable this to resolve the build error
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap()],
  adapter: netlify()
});
