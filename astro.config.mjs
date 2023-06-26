import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import uswds_links from "./src/plugins/uswds_links";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: 'https://smartpay.gsa.gov',
    base: process.env.BASEURL,
    integrations: [mdx(), sitemap()],
    outDir: '_site',
    markdown: {
      rehypePlugins: [uswds_links]
    }
  });