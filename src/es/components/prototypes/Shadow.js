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
    getMode,
    mode,
    namespace,
    hasShadowRoot,
    root,
    cssSelector,
    css,
    _css,
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
    this.mode = this.getMode(typeof options.mode === 'string' ? options.mode : this.getAttribute('mode'))
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
   * @param {string | null} mode
   * @return {mode}
   */
  getMode (mode) {
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
    if (!this._css) {
      /** @type {HTMLStyleElement} */
      this._css = document.createElement('style')
      this._css.setAttribute('_css', '')
      this._css.setAttribute('protected', 'true') // this will avoid deletion by html=''
      this.root.appendChild(this._css)
    }
    if (!style) {
      this._css.textContent = ''
    } else {
      if (!this.hasShadowRoot) {
        style = style.replace(/:host\s{0,5}\((.*?)\)/g, `${this.cssSelector}$1 `) // remove :host([...]) selector brackets
        style = style.replace(/:host\s{0,5}/g, `${this.cssSelector} `)
      }
      if (this.namespace) {
        if (style.includes('---')) console.error('this.css has illegal dash characters at:', this)
        if (this.hasAttribute('namespace-fallback')) style = style.replace(/var\(--([^),\s]*)([^)]*)/g, `var(--$1, var(==$1$2)`) // only the namespace of the first statements variable is going to fallback
        style = style.replace(/--/g, `--${this.namespace}`)
        if (this.hasAttribute('namespace-fallback')) style = style.replace(/==/g, `--`)
      }
      this._css.textContent += style
    }
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
