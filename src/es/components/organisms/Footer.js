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
 *  --a-link-font-size [1rem]
 *  --a-link-font-size-2 [1rem]
 *  --list-style [none]
 *  --align-items [start]
 *  --font-size [1rem]
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
   * renders the o-footer css
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
        height: 100%;
      }
      :host a-link {
        --padding: var(--a-link-content-spacing, 0);
      }
      :host > footer ul > li > * {
        --font-size: var(--a-link-font-size, 1rem);
        font-size: var(--a-link-font-size, 1rem);
        display: block;
      }
      :host > footer ul > li > ul * {
        --font-size: var(--a-link-font-size-2, 1rem);
      }
      :host > footer ul > li {
        color: var(--color, red);
      }
    `
    /*----------------------------------------- CLUB CONCERT CSS -------------------------------------------------*/
    if (this.getAttribute("theme") === "simple") {
      this.css = /* css */`
        :host {
          width: var(--content-width, 100%);
          margin: var(--margin, 0 auto);
        }
        :host footer {
          display: flex;
          flex-direction: column;
        }
        :host .logo-container {
          display: flex;
          justify-content: space-between;
        }
        :host .logo-container :first-child {
          --logo-height: var(--first-height, max(65px, 4.8vw));
          --logo-height-mobile: var(--first-height-mobile, 48px);
        }
        :host .footer-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        :host ul, :host .language-switcher
        {
          display: flex;
          flex-direction: row;
          list-style: var(--list-style, none);
          justify-content: center;
          margin: var(--ul-margin, 10px 0);
          padding: 0;
        }
        :host ul li {
          margin: 0 var(--content-spacing, 15px);
        }
        :host .language-switcher li {
          margin: 0 var(--lanuage-switcher-margin, 5px);
        }
        :host .language-switcher {
          margin-left: 15px;
        }
        @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
          :host {
            width: var(--content-width-mobile, 90%);
          }
          :host .logo-container:first-child {
            --logo-height: var(--first-height-mobile, 50px);
          }
          :host .footer-links {
            flex-direction: column;
          }
          :host ul {
            flex-direction: column;
          }
          :host .language-switcher {
            margin-left: 0;
          }
          :host ul li {
            align-self: center;
            margin: var(--mobile-content-spacing, 0) 0;
          }
          :host ul li:first-of-type {
            margin-top: 0;
          }
          :host ul li:last-of-type {
            margin-bottom: 0;
          }
          :host > footer ul > li > * {
            --font-size: var(--a-link-font-size-mobile, 1rem);
            font-size: var(--a-link-font-size-mobile, 1rem);
          }
        }
      `
      /*-----------------------------------------------------------------------------*/
    } else {
      this.css = /* css */`
        :host ul {
          list-style: var(--list-style, none);
          margin: calc(var(--content-spacing, 40px) / 2) auto 0;
          padding: 0;
        }
        :host ul:first-child{
          margin-top: 0;
        }
        :host > footer > ul {
          align-items: var(--align-items, start);
          display: flex;
          flex-wrap: wrap;
          padding: calc(var(--content-spacing, 40px) / 2) var(--content-spacing, 40px);
        }
        :host > footer > ul > li{
          font-size: var(--font-size, 1rem);
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
    if (this.childComponentsPromise) return this.childComponentsPromise
    let linkPromise
    try {
      linkPromise = Promise.resolve({default: Link})
    } catch (error) {
      linkPromise = import('../atoms/Link.js')
    }
    return (this.childComponentsPromise = Promise.all([
      linkPromise.then(
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