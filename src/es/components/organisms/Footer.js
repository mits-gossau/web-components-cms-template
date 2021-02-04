// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Footer is sticky and hosts uls
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: footer;
 *  --background-color [black]
 *  --z-index [100]
 *  --content-spacing [40px]
 *  --a-link-content-spacing [0]
 *  --a-link-font-size [1.5rem]
 *  --a-link-font-size-2 [1rem]
 *  --list-style [none]
 *  --align-items [start]
 *  --font-size [2.5rem]
 * }
 */
export default class Footer extends Shadow() {
  constructor (...args) {
    super(...args)

    this.footer = document.createElement('footer')
    this.footer.hidden = true
    Array.from(this.root.children).forEach(node => {
      if (!node.getAttribute('slot')) this.footer.appendChild(node)
    })
    this.root.appendChild(this.footer)
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector('style[_css]')
  }

  /**
   * renders the m-footerigation css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        grid-area: footer;
        z-index: var(--z-index, 100);
      }
      :host > footer {
        background-color: var(--background-color, black);
      }
      :host a-link {
        --padding: var(--a-link-content-spacing, 0);
      }
      :host > footer > ul > li > a-link {
        --font-size: var(--a-link-font-size, 1.5rem);
        display: block;
      }
      :host > footer > ul > li > ul a-link {
        --font-size: var(--a-link-font-size-2, 1rem);
      }
      :host ul{
        list-style: var(--list-style, none);
        margin: calc(var(--content-spacing, 40px) / 2) auto 0;
        padding: 0;
      }
      :host > footer > ul{
        align-items: var(--align-items, start);
        display: flex;
        flex-wrap: wrap;
        padding: calc(var(--content-spacing, 40px) / 2) var(--content-spacing, 40px);
      }
      :host > footer > ul > li{
        font-size: var(--font-size, 2.5rem);
      }
      :host > footer > ul li:hover{
        cursor: pointer;
      }
      :host > footer > ul > li{
        margin: calc(var(--content-spacing, 40px) / 2) var(--content-spacing, 40px) 0 0;
      }
      :host > footer > ul li{
        padding-bottom: .5rem;
      }
      :host > footer > ul li:last-child{
        padding-bottom: 0;
      }
      :host > footer > ul > li:last-child {
        margin-right: 0;
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    this.loadChildComponents().then(children => Array.from(this.root.querySelectorAll('a')).forEach(a => {
      const li = a.parentElement
      const aLink = new children[0][1](a, {namespace: this.getAttribute('namespace') || ''})
      aLink.setAttribute('text-transform', 'uppercase')
      a.replaceWith(aLink)
      li.prepend(aLink)
      this.footer.hidden = false
    }))
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../atoms/Link.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-link', module.default]
      )
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }
}