import {visit} from "unist-util-visit"
import path from 'path'

export default (options) => {
  function visitor(node) {
    // only process links that start at the root without schema
    if (node.url.startsWith('/') && !node.url.startsWith('//')) {
        node.url = path.join('/', options.baseURL, node.url)
    }
  }

  function transform(tree) {
    if (options) {
      visit(tree, "link", visitor)
    } else {
      throw Error("Missing required `baseURL` option.")
    }
  }
  return transform
}