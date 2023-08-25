import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import process_anchors from "./src/plugins/process_anchors";
import process_image_urls from './src/plugins/process_image_urls';
import sitemap from "@astrojs/sitemap";
import generateRedirects from './src/config/redirects';
import sitemapFilter from "./src/config/sitemapFilter";

// https://astro.build/config
export default defineConfig({
    site: 'https://demo.smartpay.gsa.gov/',
    base: process.env.BASEURL,
    integrations: [mdx(), sitemap({ filter: sitemapFilter })],
    outDir: '_site',
    markdown: {
      rehypePlugins: [
        [process_anchors, {baseURL: process.env.BASEURL || '/'}],
        [process_image_urls, {baseURL: process.env.BASEURL || '/'}]
      ],
    },
    redirects: generateRedirects(process.env.BASEURL)
});