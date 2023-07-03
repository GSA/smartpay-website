import {visit} from "unist-util-visit"
import path from 'path'
/**
 * This plugin processes markdown files and looks for images and 
 * links with absolute links. These links break on cloud.gov pages
 * branch previews. This will append the base_url which can be obtained
 * from the build environment BASEURL variable. To use add to 
 * astro.config.mjs markdown remarkPlugins and pass the base url in:
 * [[prefix_links, {baseURL: process.env.BASEURL || '/'}]]
 */

export default (options) => {
  function visitor(node) {
    // only process links that start at the root without schema
    if (node.url.startsWith('/') && !node.url.startsWith('//')) {
        node.url = path.join('/', options.baseURL, node.url)
    }
  }

  function transform(tree) {   
    if (options) {
      visit(tree, ["link", "image"], visitor)
    } else {
      throw Error("Missing required `baseURL` option.")
    }
  }
  return transform
}