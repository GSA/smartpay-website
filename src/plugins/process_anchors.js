/*
 * The purpose of this is to process links in content sources to prevent
 * local links on cloud.gov pages feature branches from breaking.
 * Markdown links like [some text](somelink) will be prefixed with the
 * Base_URL and have the class `usa-link` added. If the link is a
 * non-smartpay link it will additionally get the usa-link--external class
 *
 * Inline html links like <a href="somelink">some text</>
 * will only be prefixed with the baseURL. Classes can be added inline
 */


import {visit} from 'unist-util-visit'

import path from 'path'

function isInternalDomain(url) {
  try {
    const domain = new URL(url)
    const internalHost = [
      'gsa.gov',
      'www.gsa.gov' 
    ]
    return internalHost.includes(domain.hostname) || domain.protocol === 'mailto:'
  } catch(e) {
    // this represents urls like "/some/path" without domain
    return true
  }
}

function process_mdx_anchor(node, baseURL) {
  /**
   * Process raw links in source content
   * like <a href="/some_link">text</a>
   */

  node.attributes.forEach(attr => {
    if (attr.name === 'href' && attr.value.startsWith('/') && !attr.value.startsWith('//')) {
      attr.value = path.join('/', baseURL, attr.value)
    }
  });
}

function process_markdown_link(node, baseURL) {
   /**
   * Process raw links in source content
   * like [some text](/some_link)
   */

  const properties = node.properties
  properties.className = isInternalDomain(properties.href)
  ? 'usa-link'
  : 'usa-link  usa-link--external';

  if (properties.href.startsWith('/') && !properties.href.startsWith('//')) {
    properties.href = path.join('/', baseURL, properties.href)
  }

  //add download attribute to links going to internal files
  if(isInternalDomain(properties.href) && properties.href.includes("/files/")){
    properties.download = '';
  }
}
export default (options) => {
  return tree => {
    visit(tree,  [{"type": "element", "tagName": "a"}, {"type":'mdxJsxTextElement', "name": "a"}], (node) => {
      if (node.type === 'mdxJsxTextElement') {
        process_mdx_anchor(node, options.baseURL)
      } else {
        process_markdown_link(node, options.baseURL)
      }
    })
  }
};

