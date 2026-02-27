import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // O el adaptador que uses (Vercel, Netlify...)

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
});