// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Link is a wrapper for an a-tag
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Link
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} href used for the link reference
 * }
 * @css {
 *  --text-transform [none]
 *  --color [red]
 *  --font-size [1rem]
 *  --font-weight [300]
 *  --padding [14px 10px]
 *  --text-align [left]
 *  --text-transform [none]
 *  --color-hover [yellow]
 * }
 */
export default class Link extends Shadow() {
  constructor (a, ...args) {
    super(...args)

    this.a = a
  }

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
    return !this.root.querySelector('a')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host > a {
        box-sizing: border-box;
        color: var(--color, red);
        display: block;
        font-size: var(--font-size, 1rem);
        font-weight: var(--font-weight, 300);
        height: 100%;
        padding: var(--padding, 14px 10px);
        text-align: var(--text-align, left);
        text-decoration: var(--text-decoration, none);
        text-transform: var(--text-transform, none);
        transition: var(--transition, all 0.2s ease);
        width: 100%;
      }
      :host > a:hover{
        color: var(--color-hover, var(--color, yellow));
        text-decoration: var(--text-decoration-hover, var(--text-decoration, none));
      }
      :host > span {
        display: var(--span-display, inline);
      }
      
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > a {
          display: var(--a-display-mobile, block);
        }
        :host > span {
          display: var(--span-display-mobile, none);
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
    this.html = this.a
  }
}
