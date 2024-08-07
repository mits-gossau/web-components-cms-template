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
 *  {boolean} [hit-area=false] this lets you define a hit-area of your link, to avoid too large focus (hit-area) by fonts too large line-height, which can't be overwritten with css: https://github.com/mits-gossau/web-components-cms-template/issues/53
 * }
 * @css {
 *  --text-transform [none]
 *  --color [red]
 *  --font-size [1rem]
 *  --font-weight [normal]
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
      ${this.hitArea
        ? /* css */`
          :host {
            display: grid;
          }
          :host > a {
            z-index: 1;
          }
          :host > ${this.hitAreaTagName} {
            z-index: 0;
          }
          :host > a, :host > ${this.hitAreaTagName} {
            grid-column: 1;
            grid-row: 1;
          }
          :host > a:hover ~ ${this.hitAreaTagName} {
            color: var(--color-hover, var(--color, yellow));
            text-decoration: var(--text-decoration-hover, var(--text-decoration, none));
          }
        `
        : ''}
      :host > a, :host > ${this.hitAreaTagName} {
        box-sizing: border-box;
        color: var(--color, red);
        display: var(--display, block);
        font-size: var(--font-size, 1rem);
        line-height: var(--line-height, normal);
        font-weight: var(--font-weight, normal);
        height: 100%;
        padding: var(--padding, 14px 10px);
        text-align: var(--text-align, left);
        text-decoration: var(--text-decoration, none);
        text-underline-offset: var(--a-text-underline-offset, unset);
        text-transform: var(--text-transform, none);
        transition: var(--transition, all 0.2s ease);
        width: 100%;
      }
      :host > a:hover {
        color: var(--color-hover, var(--color, yellow));
        text-decoration: var(--text-decoration-hover, var(--text-decoration, none));
      }
      :host > span {
        display: var(--span-display, inline);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > a, :host > ${this.hitAreaTagName} {
          display: var(--display-mobile, var(--display, block));
          line-height: var(--line-height-mobile, var(--line-height, normal));
        }
        :host > span {
          display: var(--span-display-mobile, var(--span-display, none));
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
    if (this.hitArea) {
      this.hitArea.innerHTML = this.a.innerHTML
      this.hitArea.setAttribute('data-href', this.a.getAttribute('href'))
      this.hitArea.setAttribute('role', 'link')
      this.a.setAttribute('aria-label', this.a.textContent)
      this.a.innerHTML = ''
      this.root.appendChild(this.hitArea)
    }
  }

  get hitArea () {
    return this.getAttribute('hit-area') && this.getAttribute('hit-area') !== 'false' ? this._hitArea || (this._hitArea = document.createElement(this.hitAreaTagName)) : null
  }

  get hitAreaTagName () {
    return 'div'
  }
}
