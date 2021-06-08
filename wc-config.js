// @ts-check
// script inclusion example: <script type="text/javascript" src="/wc-config.js?baseUrl=/src/es/components/&directories=[{'selector': 'a-picture', 'url': 'atoms/Picture.js'}]"></script>
// the script src can hold two parameters: baseUrl (only used if the directory.url is relative) and directories/directory[] which will overwrite the preset directories
(function(self, document){
  /**
   * Directory sets selector and url by which a reference between tagName/selector and url/file can be done (customElements.define(name aka. tagName, constructor aka. constructorName))
   * The following two options are available:
   *  1) a specific selector can be fed with a specific url to a javascript file example: {selector: 'playlist-item', url: './src/es/components/molecules/PlaylistItem.js'}
   *  2) a non-specific selector can be fed with a url to a folder example: {selector: 'm-', url: './src/es/components/molecules/'} which will resolve example: tagName m-playlist-item to filename PlaylistItem.js
   *
   * @typedef {{
      selector: string, // finds first most specific/longest selector (selector.length) matching the node.tagName
      url: string, // url pointing to the javascript file or to a directory which contains javascript files (for directories the selector should end with a trailing hyphen)
    }} Directory
  */
  // @ts-ignore
  const src = new URL(document.currentScript.src)
  /**
   * the baseUrl should point to the components folder and is only used if the directory.url.charAt(0) is not "." nor "/"
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
    const directory = directories.find(directory => tagName.includes(directory.selector))
    // if the directory.url points to a javascript file the constructorName will be an empty string '' else it will replace the replace the selector from tagName if possible then it will convert  hyphen separated tagNames to camel case example: playlist-item => PlaylistItem
    const constructorName = /\.[m]{0,1}js/.test(directory.url) ? '' : `${(tagName.replace(directory.selector, '') || tagName).charAt(0).toUpperCase()}${(tagName.replace(directory.selector, '') || tagName).slice(1).replaceAll(/-([a-z]{1})/g, (match, p1) => p1.toUpperCase())}.js`
    // baseUrl is only used if directory.url does not start with a '/' or '.'
    if (!customElements.get(tagName)) import(`${/[\.\/]{1}/.test(directory.url.charAt(0)) ? '' : baseUrl}${directory.url}${constructorName}`).then(module => customElements.define(tagName, module.default))
  }
  // finding all not defined web component nodes in the dom and forwarding their tagNames to the load function
  self.addEventListener('load', event => [...new Set(Array.from(document.querySelectorAll(':not(:defined)')).map(node => node.tagName.toLowerCase()))].forEach(tagName => load(tagName), {once: true}))
})(window || self, document)