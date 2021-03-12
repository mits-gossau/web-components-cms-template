// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * General is simply a grid which expects certain grid-areas
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class General
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-template-areas!
 *  --header-height  [85px]
 *  --header-height-mobile [50px]
 *  --footer-min-height  [250px]
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
  constructor (...args) {
    super({ mode: 'false' }, ...args) // disabling shadow-DOM to control root font-size on html-tag
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
        grid-template-columns: 100%;
        grid-template-rows: var(--header-height , 85px) 1fr minmax(var(--footer-min-height , 250px), auto);
        min-height: 100vh;
      }
      /* global css set by page */
      html {
        font-size: var(--font-size, 10px);
        line-height: var(--line-height, normal);
        word-break: var(--word-break, normal);
      }
      /* to counteract misc.css */
      /* hide component stuff before it is rendered to avoid the blitz (flashing white) also set the --background-color in the variables...css */
      :host, html {
        color: var(--color, black);
        font-family: var(--font-family, "FuturaT", Arial, sans-serif);
      }
      html a {
        color: var(--a-color, var(--color-secondary, blue));
        font-family: var(--font-family, "FuturaT", Arial, sans-serif);
      }
      /* sticky footer */
      body {
        margin: 0;
        min-height: 100vh;
        overflow-x: hidden;
      }
      /* navigation open */
      body.no-scroll {
        overflow: hidden;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          grid-template-rows: var(--header-height-mobile, 50px) 1fr minmax(var(--footer-min-height-mobile, 150px), auto);
        }
        /* global css set by page */
        html {
          font-size: var(--font-size-mobile, 10px);
          line-height: var(--line-height-mobile, normal);
          word-break: var(--word-break-mobile, normal);
        }
      }
    `
  }
}
