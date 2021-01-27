// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
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
        background-color: var(--background-color);
        grid-area: footer;
        --padding: calc(var(--content-margin) / 2);
        --font-color-hover: white;
      }
      :host a-link {
        --padding: 0;
      }
      :host > footer > ul > li > a-link {
        --font-color: var(--font-color-footer-active);
        --font-size: 1.5rem;
        display: block;
        padding-bottom: 1rem;
      }
      :host ul{
        list-style: none;
        margin: var(--content-margin) auto 0;
        padding: 0;
      }
      :host ul:last-child{
        margin: 0 auto var(--content-margin);
      }
      :host > footer > ul{
        align-items: start;
        display: flex;
        flex-wrap: wrap;
        padding: var(--padding) var(--content-margin);
      }
      :host > footer > ul > li{
        font-size: 25px;
      }
      :host > footer > ul li:hover{
        cursor: pointer;
      }
      :host > footer > ul > li{
        margin-right: calc(var(--content-margin) / 4);
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
      const aLink = new children[0][1](a.children)
      aLink.setAttribute('href', a.getAttribute('href'))
      aLink.setAttribute('text-transform', 'uppercase')
      aLink.textContent = a.textContent
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