/*
 * Filter sitemap entries to exclude redirects.
 */

import redirects from "./redirects"

export default (page) => {
  return !Object.keys(redirects()).some(fromPath => {
    // Remove trailing slashes before comparing
    page = page.replace(/\/$/, "")
    fromPath = fromPath.replace(/\/$/, "")
    return page.endsWith(fromPath)
  })
}
