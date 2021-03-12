// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

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
        align-items: center;
        align-self: var(--align-self, auto);
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        margin: var(--margin, 0px);
      }
      :host img{
        display: block;
        height: var(--height, calc(var(--height, 85px) - var(--content-spacing, 40px)));
        max-height: var(--max-height, none);
        object-fit: scale-down;
        width: var(--width, auto);
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
  }

  get a () {
    return this.root.querySelector('a')
  }

  get img () {
    return this.root.querySelector('img')
  }
}
