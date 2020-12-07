// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 * @type {CustomElementConstructor}
 */
export default class Header extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('header')
  }

  /**
   * renders the o-header css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        grid-area: header;
        position: sticky;
        top: 0;
        z-index: 100;
      }
      :host > header {
        align-items: center;
        background-color: var(--bg-color);
        --font-color-hover: white;
        display: flex;
        height: var(--height);
        justify-content: space-between;
        padding: 0 calc(var(--content-margin) / 2);
      }
      :host  > header > a-menu-icon{
        display: none;
      }
      @media only screen and (max-width: 1000px) {
        :host > header{
          flex-direction: row-reverse;
          justify-content: space-between;
        }
        :host > header > m-navigation{
          display: none;
          left: 0;
          max-height: calc(100vh - var(--height));
          overflow-x: hidden;
          overflow-y: auto;
          position: absolute;
          top: var(--height);
          width: 100%;
        }
        :host > header.open > m-navigation{
          display: block;
        }
        :host  > header > a-menu-icon{
          display: block;
          padding-right: 10px;
        }
        :host > header > a-logo{
          flex-grow: 1;
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    const header = this.root.appendChild(document.createElement('header'))
    Array.from(this.root.children).forEach(node => {
      if (node !== header) header.appendChild(node)
    })
    this.loadChildComponents().then(children => {
      const MenuIcon = new children[0][1]()
      MenuIcon.addEventListener('click', event => {
        header.classList.toggle('open')
        const isOpen = header.classList.contains('open')
        document.body.classList[isOpen ? 'add' : 'remove']('no-scroll')
      })
      header.appendChild(MenuIcon)
    })
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../atoms/MenuIcon.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-menu-icon', module.default]
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