import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import process_anchors from "./src/plugins/process_anchors";
import process_image_urls from './src/plugins/process_image_urls';
import sitemap from "@astrojs/sitemap";
import generateRedirects from './src/config/redirects';
import sitemapFilter from "./src/config/sitemapFilter";

const base = process.env.BASEURL ? process.env.BASEURL : '/'
// https://astro.build/config
export default defineConfig({
    site: 'https://smartpay.gsa.gov/',
    base: base,
    integrations: [mdx(), sitemap({ filter: sitemapFilter })],
    outDir: '_site',
    markdown: {
      rehypePlugins: [
        [process_anchors, {baseURL: base}],
        [process_image_urls, {baseURL: base}]
      ],
    },
    redirects: generateRedirects(base)
});