export function ensureTrailingSlash(url) {
    if (!url.endsWith('/')) {
      return url + '/';
    }
    return url;
  }
