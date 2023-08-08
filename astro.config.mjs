import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import process_anchors from "./src/plugins/process_anchors";
import process_image_urls from './src/plugins/process_image_urls';
import sitemap from "@astrojs/sitemap";
import redirects from "./src/config/redirects";
import sitemapFilter from "./src/config/sitemapFilter";

// https://astro.build/config
export default defineConfig({
    site: 'https://federalist-ab31a10d-375d-4040-9324-1ae94e8a36b9.sites.pages.cloud.gov/site/gsa/smartpay-website/',
    base: process.env.BASEURL,
    integrations: [mdx(), sitemap({ filter: sitemapFilter })],
    outDir: '_site',
    markdown: {
      rehypePlugins: [
        [process_anchors, {baseURL: process.env.BASEURL || '/'}],
        [process_image_urls, {baseURL: process.env.BASEURL || '/'}]
      ],
    },
    redirects
});