// @ts-check

/* global customElements */
/* global self */
/* global CustomEvent */

// wc-config is a loader script which finds all not defined nodes / web components, takes their node.tagNames and tries to resolve them by the directory given or url attribute directly set on the web components node
// the javascript files to be resolved must have a default export to be applied as customElements.define constructor

// script inclusion example: <script type="text/javascript" src="../../../../wc-config.js"></script>
// script inclusion example with parameters: <script type="text/javascript" src="/wc-config.js?baseUrl=/src/es/components/&directories=[{'selector': 'a-picture', 'url': 'atoms/Picture.js'}]"></script>
// about script src url parameters:
//  1) {string}[baseUrl='./src/es/components/'] only used to prepend url if the url is relative / does not start with a '/' nor '.')
//  2) {directory[]}[directories=[]] which will overwrite/complement the default directories example: directories=[{'selector': 'a-picture', 'url': 'atoms/Picture.js'}, {'selector': 'a-', 'url': 'all/'}]
//  3) {boolean}[useDefaultDirectories=true] If the default defined directories shall be used/complemented upon
//  4) {string}[querySelector=''] to be prepended to querySelectorAll(`${src.searchParams.get('selector') || ''}:not(:defined)`) which finds all not defined nodes / web components with your querySelector
//  5) {string}[urlAttributeName='url'] to define the attribute/node property name at which it will be searching the attribute with a url which can be directly set on the web components node example <a-picture url="./that/folder/Picture.js"></a-picture>
//  6) {boolean}[urlAttributeLastTrumpsAll=true] set to false if it is desired that the first node with the url attribute has the final say about the files location
//  7) {string, false}[wc-config-load='wc-config-load'] the name under which the application will Promise.all.finally execute the console.info and emit the CustomEvent(Name) at document.body, set to false if Event and Log shall be suppressed
//  8) {boolean}[debug=true] assumes we are on debug and does post the result on console.info. Set to 'false' to suppress the console.info
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
   * the attribute/property name at which will be searched for an url on the web component node
   * @type {string}
   */
  const urlAttributeName = src.searchParams.get('urlAttributeName') || 'url'
  /**
   * the baseUrl should point to the components folder and is only used if the url is relative / url.charAt(0) is not "." nor "/"
   * @type {string}
   */
  baseUrl = src.searchParams.get('baseUrl') || baseUrl
  /** @type {Directory[]} */
  directories = JSON.parse((src.searchParams.get('directories') || '').replace(/'/g, '"') || '[]').concat(src.searchParams.get('useDefaultDirectories') !== 'false' ? directories : []).sort((a, b) => b.selector.length - a.selector.length) // list must be sorted by longest and most specific selector first (selector string length descending)
  // loading and defining the web components by its tagNames
  const load = (tagName, url) => {
    // baseUrl is only used if url is relative / does not start with "." nor "/"
    if (!customElements.get(tagName)) {
      /** @type {Directory} */
      const directory = directories.find(directory => tagName.includes(directory.selector)) || { url: '', selector: '' }
      /**
       * urls priority is node.attribute, searchParams.directory, preset adjustable directory
       * @type {string}
       */
      url = url || directory.url
      if (url) {
        // if the url points to a javascript file the fileName will be an empty string '' else it will replace the directory.selector from tagName, if possible, then it will convert hyphen separated tagNames to camel case example: playlist-item => PlaylistItem
        const fileName = /.[m]{0,1}js/.test(url) ? '' : `${(tagName.replace(directory.selector, '') || tagName).charAt(0).toUpperCase()}${(tagName.replace(directory.selector, '') || tagName).slice(1).replaceAll(/-([a-z]{1})/g, (match, p1) => p1.toUpperCase())}.js`
        return import(`${/[./]{1}/.test(url.charAt(0)) ? '' : baseUrl}${url}${fileName}`).then(module => {
          if (!customElements.get(tagName)) {
            customElements.define(tagName, module.default)
            return [tagName, module.default]
          }
          return `${tagName} is already defined`
        })
      }
      return `${tagName} url has not been found within the directories nor is an attribute url aka. ${urlAttributeName} present on node`
    }
    return `${tagName} is already defined`
  }
  // finding all not defined web component nodes in the dom and forwarding their tagNames to the load function
  self.addEventListener('load', event => {
    const imports = []
    Array.from(document.querySelectorAll(`${src.searchParams.get('querySelector') || ''}:not(:defined)`)).reduce((nodes, currentNode) => {
      const index = nodes.findIndex(node => node.tagName === currentNode.tagName)
      if (index !== -1) {
        if ((src.searchParams.get('urlAttributeLastTrumpsAll') !== 'false' || !nodes[index].hasAttribute(urlAttributeName)) && currentNode.hasAttribute(urlAttributeName)) nodes.splice(index, 1, currentNode)
        return nodes
      }
      return [...nodes, currentNode]
    }, []).forEach(node => imports.push(load(node.tagName.toLowerCase(), node.getAttribute(urlAttributeName) || '')))
    Promise.all(imports).finally(() => {
      if (src.searchParams.get('wc-config-load') !== 'false') {
        const wcConfigLoad = src.searchParams.get('wc-config-load') || 'wc-config-load'
        if (src.searchParams.get('debug') !== 'false') console.info(wcConfigLoad, imports)
        document.body.dispatchEvent(new CustomEvent(wcConfigLoad,
          {
            detail: { imports },
            bubbles: true,
            cancelable: true,
            composed: true
          }
        ))
      }
    })
  }, { once: true })
})(window || self, document,
  // ↓↓↓ adjustable ↓↓↓
  './src/es/components/', // baseUrl
  [
    {
      selector: 'a-',
      url: 'web-components-cms-template/src/es/components/atoms/'
    },
    {
      selector: 'c-',
      url: 'web-components-cms-template/src/es/components/controllers/'
    },
    {
      selector: 'm-',
      url: 'web-components-cms-template/src/es/components/molecules/'
    },
    {
      selector: 'msrc-',
      url: 'web-components-cms-template/src/es/components/msrc/'
    },
    {
      selector: 'o-',
      url: 'web-components-cms-template/src/es/components/organisms/'
    },
    {
      selector: 'p-',
      url: 'web-components-cms-template/src/es/components/pages/'
    },
    {
      selector: 'third-party-',
      url: 'web-components-cms-template/src/es/components/thirdParty/'
    },
    {
      selector: 'mindustry-a-',
      url: 'atoms/'
    }
  ] // directories
  // ↑↑↑ adjustable ↑↑↑
)
