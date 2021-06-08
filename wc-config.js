// @ts-check

/* global customElements */
/* global self */
/* global CustomEvent */

// wc-config is a loader script which finds all not defined nodes / web components, takes their node.tagNames and tries to resolve them by the directory given or url attribute directly set on the web components node
// the javascript files to be resolved must have a default export to be applied as customElements.define constructor

// script inclusion example: <script type="text/javascript" src="../../../../wc-config.js"></script>
// script inclusion example with parameters: <script type="text/javascript" src="/wc-config.js?baseUrl=/src/es/components/&directories=[{'selector': 'a-picture', 'url': 'atoms/Picture.js'}]"></script>
// about script src url parameters:
//  1) baseUrl (only used if the url is relative / does not start with a '/' nor '.') example: baseUrl=/src/es/components/
//  2) directories/directory[] which will overwrite the preset directories example: directories=[{'selector': 'a-picture', 'url': 'atoms/Picture.js'}, {'selector': 'a-', 'url': 'all/'}]
(function (self, document, baseUrl, directories) {
  /**
   * Directory sets selector and url by which a reference between tagName/selector and url/file can be done (customElements.define(name aka. tagName, constructor))
   * The following two options are available:
   *  1) a specific selector can be fed with a specific url to a javascript file example: {selector: 'playlist-item', url: './src/es/components/molecules/PlaylistItem.js'}
   *  2) a non-specific selector can be fed with a url to a folder example: {selector: 'm-', url: './src/es/components/molecules/'} which will resolve example: tagName m-playlist-item to fileName PlaylistItem.js at location ./src/es/components/molecules/PlaylistItem.js
   *
   * @typedef {{
      selector: string, // finds first most specific/longest selector (selector.length) matching the node.tagName
      url: string, // url pointing to the javascript file or to a directory which contains javascript files (for directories the selector should end with a trailing hyphen)
    }} Directory
  */
  // @ts-ignore
  const src = new URL(document.currentScript.src)
  /**
   * the baseUrl should point to the components folder and is only used if the url is relative / url.charAt(0) is not "." nor "/"
   * @type {string}
   */
  baseUrl = src.searchParams.get('baseUrl') || baseUrl
  /** @type {Directory[]} */
  directories = JSON.parse((src.searchParams.get('directories') || '').replace(/'/g, '"') || '[]').concat(directories).sort((a, b) => b.selector.length - a.selector.length) // list must be sorted by longest and most specific selector first (selector string length descending)
  // loading and defining the web components by its tagNames
  const load = (tagName, url) => {
    /** @type {Directory} */
    const directory = directories.find(directory => tagName.includes(directory.selector))
    /**
     * urls priority is node.attribute, searchParams.directory, preset adjustable directory
     * @type {string}
     */
    url = url || directory.url
    // if the url points to a javascript file the fileName will be an empty string '' else it will replace the directory.selector from tagName, if possible, then it will convert hyphen separated tagNames to camel case example: playlist-item => PlaylistItem
    const fileName = /.[m]{0,1}js/.test(url) ? '' : `${(tagName.replace(directory.selector, '') || tagName).charAt(0).toUpperCase()}${(tagName.replace(directory.selector, '') || tagName).slice(1).replaceAll(/-([a-z]{1})/g, (match, p1) => p1.toUpperCase())}.js`
    // baseUrl is only used if url is relative / does not start with "." nor "/"
    if (!customElements.get(tagName)) {
      return import(`${/[./]{1}/.test(url.charAt(0)) ? '' : baseUrl}${url}${fileName}`).then(module => {
        if (!customElements.get(tagName)) {
          customElements.define(tagName, module.default)
          return [tagName, module.default]
        }
        return `${tagName} is already defined`
      })
    }
    return `${tagName} is already defined`
  }
  // finding all not defined web component nodes in the dom and forwarding their tagNames to the load function
  self.addEventListener('load', event => {
    const imports = [];
    [...new Set(Array.from(document.querySelectorAll(':not(:defined)')).map(node => `${node.tagName.toLowerCase()}|${node.getAttribute('url') || ''}`))].forEach(nodeStr => imports.push(load(...nodeStr.split('|'))), { once: true })
    Promise.all(imports).finally(() => {
      console.info('wc-config-load', imports)
      document.body.dispatchEvent(new CustomEvent('wc-config-load',
        {
          detail: { imports },
          bubbles: true,
          cancelable: true,
          composed: true
        }
      ))
    })
  })
})(window || self, document,
  // ↓↓↓ adjustable ↓↓↓
  './src/es/components/', // baseUrl
  [ // directories
    {
      selector: 'a-',
      url: 'atoms/'
    },
    {
      selector: 'c-',
      url: 'controllers/'
    },
    {
      selector: 'm-',
      url: 'molecules/'
    },
    {
      selector: 'msrc-',
      url: 'msrc/'
    },
    {
      selector: 'o-',
      url: 'organisms/'
    },
    {
      selector: 'p-',
      url: 'pages/'
    },
    {
      selector: 'third-party-',
      url: 'thirdParty/'
    }
  ]
  // ↑↑↑ adjustable ↑↑↑
)
