// @ts-check
(function(self, document){
  /**
   * Directory sets the entry which can reference a tagName/selector to its Class/JavaScript file @ customElements.define
   * a specific selector can be fed with a specific url to a javascript file expl. {selector: 'playlist-item', url: './src/es/components/molecules/PlaylistItem.js'}
   * a non-specific selector can be fed with a url to a folder expl. {selector: 'm-', url: './src/es/components/molecules/'} which will resolve expl. tagName m-playlist-item to filename PlaylistItem.js
   *
   * @typedef {{
      selector: string, // finds first most specific/longest selector (selector.length) matching the node.tagName
      url: string, // url pointing to the javascript file or to it's containing directory with trailing slash
    }} Directory
  */
  /** @typedef {Directory[]} Directories */
  // @ts-ignore
  const url = new URL(document.currentScript.src)
  const baseUrl = url.searchParams.get('baseUrl') || ''
  /** @type {Directories} */
  const directories = Object.assign([
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
  ], JSON.parse((url.searchParams.get('directories') || '').replace(/'/g, '"') || '[]')).sort((a, b) => b.selector.length - a.selector.length) // list must be sorted by longest and most specific selector first (selector string length descending)
  // loading and defining the web components by its tagNames
  const load = tagName => {
    /** @type {Directory} */
    const entry = directories.find(entry => tagName.includes(entry.selector))
    const className = entry.url.includes('.js') || entry.url.includes('.mjs') ? '' : `${(tagName.replace(entry.selector, '') || tagName).charAt(0).toUpperCase()}${(tagName.replace(entry.selector, '') || tagName).slice(1).replaceAll(/-([a-z]{1})/g, (match, p1) => p1.toUpperCase())}.js`
    if (!customElements.get(tagName)) import(`${baseUrl}${entry.url}${className}`).then(module => customElements.define(tagName, module.default))
  }
  // finding all not defined web component nodes in the dom and forwarding their tagNames to the load function
  self.addEventListener('load', event => [...new Set(Array.from(document.querySelectorAll(':not(:defined)')).map(node => node.tagName.toLowerCase()))].forEach(node => load(node), {once: true}))
})(window || self, document)