/*
 * The purpose of this is to process image in content sources to prevent
 * local srcs (those starting with `/`) on cloud.gov pages feature branches from breaking.
 * This should work for both markdown image like ![some text](somelink) as well as
 * inline html image like <img src="somelink" alt="some text"/>
 */


import {visit} from 'unist-util-visit'

import path from 'path'


function process_mdx_image(node, baseURL) {
    /**
     * Process raw img tags in source content
     * like <img src="/some_link" />
     */

    node.attributes.forEach(attr => {
      if (attr.name === 'src' && attr.value.startsWith('/') && !attr.value.startsWith('//')) {
        attr.value = path.join('/', baseURL, attr.value)
      }
    });
  }

  function process_markdown_image(node, baseURL) {
     /**
     * Process raw links in source content
     * like ![some text](/some_link)
     */

    const properties = node.properties

    if (properties.src.startsWith('/') && !properties.src.startsWith('//')) {
      properties.src = path.join('/', baseURL, properties.src)
    }
  }
  export default (options) => {
    return tree => {
      visit(tree,  [{"type": "element", "tagName": "img"}, {"type":'mdxJsxFlowElement', "name": "img"}], (node) => {
        if (node.type === 'mdxJsxFlowElement') {
            process_mdx_image(node, options.baseURL)
        } else {
            process_markdown_image(node, options.baseURL)
        }
      })
    }
  };

