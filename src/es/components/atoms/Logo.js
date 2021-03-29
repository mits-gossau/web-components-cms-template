// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */
/* global CustomEvent */

/**
 * Logo is the navigation logo
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Logo
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} src used for the image source
 *  {string} href used for the link reference
 *  {string} mobile-breakpoint
 *  {string} alt
 *  {string} [logo-load="logo-load"]
 * }
 * @css {
 *  --content-spacing [40px]
 *  --height  [85px]
 *  --height-mobile [50px]
 *  --height [calc(var(--height , 85px) - var(--content-spacing, 40px))]
 *  --max-height [none]
 *  --margin [0px]
 * }
 */
export default class Logo extends Shadow() {
  constructor (...args) {
    super(...args)

    this.textSelector = ':host > :not(img):not(a):not(style)'

    let timeout = null
    this.resizeListener = event => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (this.text) {
          this.css = /* css */`
          ${this.textSelector}{
            width: ${this.img.getBoundingClientRect().width}px;
          }
        `
        }
      }, 200)
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    self.addEventListener('resize', this.resizeListener)
  }

  disconnectedCallback () {
    self.removeEventListener('resize', this.resizeListener)
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
    return !this.img && !!this.getAttribute('src')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host{
        align-items: var(--align-items, center);
        align-self: var(--align-self, auto);
        display: flex;
        flex-flow: var(--flex-flow, row);
        justify-content: var(--justify-content, center);
        box-sizing: border-box;
        margin: var(--margin, 0px);
      }
      :host img{
        display: block;
        height: var(--height, calc(var(--height, 85px) - var(--content-spacing, 40px)));
        max-height: var(--max-height, none);
        object-fit: scale-down;
        width: var(--width, auto);
        max-width: var(--max-width, 80vw);
      }
      ${this.textSelector}{
        box-sizing: border-box;
        color: var(--text-color, pink);
        font-size: var(--text-font-size, 1rem);
        line-height: var(--text-line-height, normal);
        padding: var(--text-padding, 0);
        margin: var(--text-margin, 0);
      }
      ${this.textSelector} a{
        color: var(--text-a-color, green);
        text-decoration: var(--text-a-text-decoration, none);
      }
      ${this.textSelector} a:hover{
        color: var(--text-a-color-hover, green);
        text-decoration: var(--text-a-text-decoration-hover, none);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host img{
          height: var(--height-mobile, 65px);
          max-height: var(--max-height-mobile, none);
          width: var(--width-mobile, auto);
        }
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    const img = `<img src=${this.getAttribute('src')} alt=${this.getAttribute('alt')}>`
    let a = null
    if (this.getAttribute('href')) {
      a = document.createElement('a')
      a.setAttribute('href', this.getAttribute('href'))
      a.innerHTML = img
    }
    this.html = a || img
    // calculated css style
    this.img.addEventListener('load', event => {
      this.resizeListener(event)
      this.dispatchEvent(new CustomEvent(this.getAttribute('logo-load') || 'logo-load', {
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    })
  }

  get a () {
    return this.root.querySelector('a')
  }

  get img () {
    return this.root.querySelector('img')
  }

  get text () {
    return this.root.querySelector(this.textSelector)
  }
}
