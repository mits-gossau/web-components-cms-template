// @ts-check
/** @typedef {ShadowRootMode | 'false'} mode */

/* global HTMLElement */
/* global document */

/**
 * Shadow is a helper with a few functions for every web component which possibly allows a shadowRoot (atom, organism and molecule)
 *
 * @export
 * @function Shadow
 * @param {CustomElementConstructor} ChosenHTMLElement
 * @attribute {mode} [mode='open'] decide which ShadowRootMode it shall be + 'false' if no shadow is desired
 * @attribute {namespace} namespace all css vars by the string passed here
 * @attribute {namespace-fallback} if the node has this attribute it will make a fallback to the css vars without namespace
 * @property {
    connectedCallback,
    disconnectedCallback,
    Shadow.parseAttribute,
    Shadow.getMode,
    mode,
    namespace,
    hasShadowRoot,
    root,
    cssSelector,
    css,
    _css,
    setCss,
    Shadow.cssHostFallback,
    Shadow.cssNamespaceToVarFunc,
    Shadow.cssNamespaceToVarDec,
    Shadow.cssNamespaceToVar,
    html
  }
 * @return {CustomElementConstructor | *}
 */
export const Shadow = (ChosenHTMLElement = HTMLElement) => class Shadow extends ChosenHTMLElement {
  /**
   * Creates an instance of Shadow. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {{mode?: mode | undefined, namespace?: string | undefined}} [options = {mode: undefined, namespace: undefined}]
   * @param {*} args
   */
  constructor (options = { mode: undefined, namespace: undefined }, ...args) {
    // @ts-ignore
    super(...args)

    /**
     * Digest attribute to have shadow or not
     * open, closed or false (no shadow) Note: open or closed only differs by exposing shadowRoot, which could be worked around anyways.
     * IMPORTANT: If you use mode = 'closed' this.shadowRoot will not be exposed and for this reason this.root, this.html and this.css is not going to work
     *
     * @type {mode}
     */
    this.mode = Shadow.getMode(typeof options.mode === 'string' ? options.mode : this.getAttribute('mode'))
    if (this.hasShadowRoot) {
      // @ts-ignore
      const shadowRoot = this.attachShadow({ mode: this.mode })
      Array.from(this.children).forEach(node => {
        if (!node.getAttribute('slot')) shadowRoot.appendChild(node)
      })
    }
    if (typeof options.namespace === 'string') this.setAttribute('namespace', options.namespace)
    /** @type {string} */
    this.namespace = this.getAttribute('namespace') || ''
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   * must be here as a placeholder
   *
   * @return {void}
   */
  connectedCallback () {}

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   * must be here as a placeholder
   *
   * @return {void}
   */
  disconnectedCallback () {}

  /**
   * Helper function to parse object strings within attributes
   * return object if JSON parsable or null
   *
   * @static
   * @param {string} attribute
   * @return {{} | null}
   */
  static parseAttribute (attribute) {
    if (!attribute || typeof attribute !== 'string') return null
    try {
      return JSON.parse(attribute.replace(/'/g, '"')) || null
    } catch (e) {
      return null
    }
  }

  /**
   * returns a mode from a string and falls back to 'open'
   *
   * @static
   * @param {string | null} mode
   * @return {mode}
   */
  static getMode (mode) {
    return mode === 'closed' || mode === 'open' || mode === 'false' ? mode : 'open'
  }

  /**
   * check if we operate with a shadow
   *
   * @readonly
   * @return {boolean}
   */
  get hasShadowRoot () {
    return this.mode === 'closed' || this.mode === 'open'
  }

  /**
   * html nodes have to be placed within the shadowRoot if existent
   * this function helps to find the parent (shadowRoot or this)
   *
   * @readonly
   * @return {ShadowRoot | this}
   */
  get root () {
    return this.shadowRoot || this
  }

  /**
   * selector :host only works when shadow is active, fallback to id then nodeName
   *
   * @readonly
   * @return {string}
   */
  get cssSelector () {
    return this.hasShadowRoot ? ':host' : this.getAttribute('id') ? `#${this.getAttribute('id')}` : this.nodeName
  }

  /**
   * the master css style of this component
   *
   * @return {string}
   */
  get css () {
    return this._css && this._css.textContent
  }

  /**
   * to clear, set empty string otherwise it gets prepended to already set style
   *
   * @param {string} style
   */
  set css (style) {
    this.setCss(style)
  }

  /**
   * setCss is an alternative to the this.css setter and returns a Promise with the string once done
   *
   * @param {string} style
   * @param {string} [cssSelector = this.cssSelector]
   * @param {string} [namespace = this.namespace]
   * @return {string}
   */
  setCss (style, cssSelector = this.cssSelector, namespace = this.namespace) {
    if (!this._css) {
      /** @type {HTMLStyleElement} */
      this._css = document.createElement('style')
      this._css.setAttribute('_css', '')
      this._css.setAttribute('protected', 'true') // this will avoid deletion by html=''
      this.root.appendChild(this._css)
    }
    if (!style) {
      return this._css.textContent = ''
    } else {
      if (!this.hasShadowRoot) style = Shadow.cssHostFallback(style, cssSelector)
      if (namespace) {
        if (style.includes('---')) console.error('this.css has illegal dash characters at:', this)
        if (this.hasAttribute('namespace-fallback')) {
          style = Shadow.cssNamespaceToVarFunc(style, namespace)
          style = Shadow.cssNamespaceToVarDec(style, namespace)
        } else {
          style = Shadow.cssNamespaceToVar(style, namespace)
        }
      }
      return this._css.textContent += style
    }
  }

  /**
   * namespace and fallback for variable consumptions
   * NOTE: this function has two simple regex which are likely faster in the main dom threat
   *
   * @static
   * @param {string} style
   * @param {string} cssSelector
   * @return {string}
   */
  static cssHostFallback(style, cssSelector) {
    style = style.replace(/:host\s{0,5}\((.*?)\)/g, `${cssSelector}$1 `) // remove :host([...]) selector brackets
    return style.replace(/:host\s{0,5}/g, `${cssSelector} `) // replace :host with cssSelector
  }

  /**
   * namespace and fallback for variable consumptions
   * NOTE: this function has a lot of recursive calls and would be nearly DOUBLE as fast within a webworker (tested)
   * BUT: It produces a flickering (build up) on pictures within a component eg. Wrapper.js and for that is skipped at this stage
   *
   * @static
   * @param {string} style
   * @param {string} namespace
   * @return {string}
   */
  static cssNamespaceToVarFunc(style, namespace) {
    return style.replace(/var\(--([^,\)]*)([^;]*)/g, (match, p1, p2) => {
      if (!p2) console.error('this.css cssNamespaceToVarFunc found corrupt css at:', this)
      return `var(--${namespace}${p1},var(--${p1}${p2 ? this.cssNamespaceToVarFunc(p2, namespace).replace(/([^\)]*)(.*?)$/, '$1)$2') : '));'}`
    })
  }

  /**
   * namespace and fallback for variable declarations
   * NOTE: this function has a simple regex which is couple ms 5-10% faster in the main dom threat (tested)
   *
   * @static
   * @param {string} style
   * @param {string} namespace
   * @return {string}
   */
  static cssNamespaceToVarDec(style, namespace) {
    return style.replace(/([^(])--([^;]*)/g, `$1--${namespace}$2;--$2`)
  }

  /**
   * namespace for variable declarations and consumptions
   * NOTE: this function has a simple regex which is likely faster in the main dom threat
   *
   * @static
   * @param {string} style
   * @param {string} namespace
   * @return {string}
   */
  static cssNamespaceToVar(style, namespace) {
    return style.replace(/--/g, `--${namespace}`)
  }

  /**
   * returns innerHTML STRING of shadow else this
   *
   * @return {string | HTMLCollection | HTMLElement[]| ChildNode[] | HTMLElement | NodeList}
   */
  get html () {
    return this.root.innerHTML
  }

  /**
   * set innerHTML of shadow else this
   *
   * @param {string | HTMLCollection | HTMLElement[]| ChildNode[] | HTMLElement | NodeList} innerHTML
   */
  set html (innerHTML) {
    if (typeof innerHTML === 'string') {
      if (!innerHTML) {
        // save all protected
        innerHTML = this.root.querySelectorAll('[protected=true]')
        // clear all childNodes but keep protected
        this.root.innerHTML = ''
      } else {
        /**
         * this div is used to render string to childNodes and avoids:
         * "this.root.innerHTML = this.root.innerHTML + innerHTML"
         * the above would re-initiate (newly construct) already set childNodes, which is bad for performance but also destroys references
         *
         * @type {HTMLElement}
         */
        const div = document.createElement('div')
        div.innerHTML = innerHTML
        innerHTML = div.childNodes
      }
    }
    // @ts-ignore
    if (innerHTML.length === undefined) innerHTML = [innerHTML]
    // @ts-ignore
    Array.from(innerHTML).forEach(node => {
      if (node) this.root.appendChild(node)
    })
  }
}
