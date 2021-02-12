// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Header can be sticky and hosts as a flex mostly a logo and a navigation
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: header;
 *  --position [sticky]
 *  --z-index [100]
 *  --align-items [center]
 *  --background-color [black]
 *  --height-desktop [85px]
 *  --justify-content-desktop [space-between]
 *  --justify-content-mobile [space-between]
 *  --content-spacing [40px]
 *  --flex-direction-desktop [row]
 *  --flex-direction-mobile [row-reverse]
 *  --height-mobile [50px]
 *  --text-align [initial]
 * }
 * @attribute {
 *  {boolean} [show]
 *  {string} mobile-breakpoint
 * }
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
        position: var(--position, sticky);
        top: 0;
        z-index: var(--z-index, 100);
        text-align: var(--text-align, initial);
      }
      :host > header {
        align-items: var(--align-items, center);
        background-color: var(--background-color, black);
        display: flex;
        flex-direction: var(--flex-direction-desktop, row);
        height: var(--height-desktop, 85px);
        justify-content: var(--justify-content-desktop, space-between);
        padding: 0 calc(var(--content-spacing, 40px) / 2);
      }
      :host  > header > a-menu-icon{
        display: none;
        --background-color: var(--color, #777);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > header {
          height: var(--height-mobile, 50px);
          flex-direction: var(--flex-direction-mobile, row-reverse);
          justify-content: var(--justify-content-mobile, space-between);
        }
        :host > header > m-navigation {
          left: 0;
          height: 0;
          max-height: calc(100vh - var(--height-mobile, 50px));
          overflow: hidden;
          position: absolute;
          transition: height 0.2s ease;
          top: var(--height-mobile, 50px);
          width: 100%;
        }
        :host > header.open > m-navigation{
          height: 100vh;
          overflow-y: auto;
        }
        :host  > header > a-menu-icon{
          display: block;
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
    if (this.getAttribute('menu-icon')) {
      this.loadChildComponents().then(children => {
        const MenuIcon = new children[0][1]({namespace: this.getAttribute('namespace') || ''})
        MenuIcon.addEventListener('click', event => {
          header.classList.toggle('open')
          const isOpen = header.classList.contains('open')
          document.body.classList[isOpen ? 'add' : 'remove']('no-scroll')
        })
        header.appendChild(MenuIcon)
      })
    }
    self.addEventListener('resize', event => document.body.classList.remove('no-scroll'))
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let menuIconPromise
    try {
      menuIconPromise = Promise.resolve({default: MenuIcon})
    } catch (error) {
      menuIconPromise = import('../atoms/MenuIcon.js')
    }
    return (this.childComponentsPromise = Promise.all([
      menuIconPromise.then(
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