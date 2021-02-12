// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * General is simply a grid which expects certain grid-areas
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class General
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-template-areas!
 *  --header-height-desktop [85px]
 *  --header-height-mobile [50px]
 *  --footer-min-height-desktop [250px]
 *  --footer-min-height-mobile [150px]
 *  --color [black]
 *  --font-family [FuturaT, (fallback)]
 *  --font-family-bold [OPTIFutura-ExtraBlackCond, (fallback)]
 * 
 * }
 * @attribute {
 *  {string} mobile-breakpoint
 * }
 */
export default class General extends Shadow() {
  constructor(...args) {
    super({mode: "false"}, ...args) // disabling shadow-DOM to control root font-size on html-tag
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
   * renders css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: grid;
        grid-template-areas: "header"
                             "body"
                             "footer";
        color: var(--color, black);
        font-family: var(--font-family, "FuturaT", Arial, sans-serif);
        grid-template-columns: 1fr;
        grid-template-rows: var(--header-height-desktop, 85px) 1fr minmax(var(--footer-min-height-desktop, 250px), auto);
        min-height: 100vh;
      }
      html {
        font-size: var(--font-size, 20px);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          grid-template-rows: var(--header-height-mobile, 50px) 1fr minmax(var(--footer-min-height-mobile, 150px), auto);
        }
        html {
          font-size: var(--font-size-mobile, 12px);
        }
      }
    `
  }
}