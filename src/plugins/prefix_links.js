import {visit} from "unist-util-visit"

export default (options) => {
  function visitor(node) {
    // only process links that start at the root
    // 
    if (node.url.startsWith('/')) {
        const relativeUrl = node.url.replace(/^\//, "")
        console.log(node)
        console.log(relativeUrl)
        console.log("Base: ", import.meta.env.BASE_URL)

        node.url = options.baseURL + relativeUrl
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