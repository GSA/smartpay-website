import {visit} from "unist-util-visit"

export default (options) => {
  function visitor(node) {
    // only process links that start at the root
    // 
    if (node.url.startsWith('/')) {
        
        node.url = `${options.baseURL}${node.url}`
    }
  }

  function transform(tree) {
    if (options && options.baseURL) {
      visit(tree, "link", visitor)
    } else {
      throw Error("Missing required `baseURL` option.")
    }
  }

  return transform
}