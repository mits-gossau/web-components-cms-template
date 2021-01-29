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
 * }
 */
export default class General extends Shadow() {
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
        grid-template-rows: var(--header-height-desktop, 85px) 1fr minmax(var(--footer-min-height-desktop, 250px), auto);
        grid-template-columns: 1fr;
        min-height: 100vh;
      }
      @media only screen and (max-width: ${self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          grid-template-rows: var(--header-height-mobile, 50px) 1fr minmax(var(--footer-min-height-mobile, 150px), auto);
        }
      }
    `
  }
}