// @ts-check
// include the script as followed <script type="text/javascript" src="/wc-config.js?baseUrl=/src/es/components/&directories=[{'selector': 'a-picture', 'url': 'atoms/Picture.js'}]"></script>
// the script src can hold two parameters: baseUrl (only used if the entry.url is relative) and directories/entry[] which will overwrite the preset directories
(function(self, document){
  /**
   * Directory sets the entry which can reference a tagName/selector to its url/file
   * a specific selector can be fed with a specific url to a javascript file expl. {selector: 'playlist-item', url: './src/es/components/molecules/PlaylistItem.js'}
   * a non-specific selector can be fed with a url to a folder expl. {selector: 'm-', url: './src/es/components/molecules/'} which will resolve expl. tagName m-playlist-item to filename PlaylistItem.js
   *
   * @typedef {{
      selector: string, // finds first most specific/longest selector (selector.length) matching the node.tagName
      url: string, // url pointing to the javascript file or to it's containing directory with trailing slash
    }} Directory
  */
  // @ts-ignore
  const src = new URL(document.currentScript.src)
  /**
   * the baseUrl should point to the components folder and is only used if the entry.url.charAt(0) is not "." nor "/"
   * @type {string}
   */
  const baseUrl = src.searchParams.get('baseUrl') || './src/es/components/'
  /** @type {Directory[]} */
  const directories = JSON.parse((src.searchParams.get('directories') || '').replace(/'/g, '"') || '[]').concat([
    // ↓↓↓ adjustable ↓↓↓
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
      url: 'third-party/'
    }
    // ↑↑↑ adjustable ↑↑↑
  ]).sort((a, b) => b.selector.length - a.selector.length) // list must be sorted by longest and most specific selector first (selector string length descending)
  // loading and defining the web components by its tagNames
  const load = tagName => {
    /** @type {Directory} */
    const entry = directories.find(entry => tagName.includes(entry.selector))
    const className = /\.[m]{0,1}js/.test(entry.url) ? '' : `${(tagName.replace(entry.selector, '') || tagName).charAt(0).toUpperCase()}${(tagName.replace(entry.selector, '') || tagName).slice(1).replaceAll(/-([a-z]{1})/g, (match, p1) => p1.toUpperCase())}.js`
    if (!customElements.get(tagName)) import(`${/[\.\/]{1}/.test(entry.url.charAt(0)) ? '' : baseUrl}${entry.url}${className}`).then(module => customElements.define(tagName, module.default))
  }
  // finding all not defined web component nodes in the dom and forwarding their tagNames to the load function
  self.addEventListener('load', event => [...new Set(Array.from(document.querySelectorAll(':not(:defined)')).map(node => node.tagName.toLowerCase()))].forEach(tagName => load(tagName), {once: true}))
})(window || self, document)