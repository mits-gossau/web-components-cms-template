// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Defines a body body for content and maps variables to global tags
 * Example at: /src/es/components/pages/General.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Body
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: body;
 *  --content-spacing [40px]
 *  --content-width [80%]
 *  --h1-color [--color, black]
 *  --font-family-secondary
 * }
 */
export default class Body extends Shadow() {
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
   * renders the o-highlight-list css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        background-color: var(--background-color, white);
        grid-area: body;
      }
      :host > * {
        margin: var(--content-spacing, 40px) auto;
        width: var(--content-width, 80%);
      }
      h1 {
        color: var(--h1-color, var(--color, black));
        font-size: var(--h1-font-size, 5rem);
      }
      h2 {
        font-size: var(--h2-font-size, 4rem);
        font-family: var(--font-family-secondary);
      }
      h3 {
        font-size: var(--h3-font-size, 3rem);
      }
      h4 {
        font-size: var(--h4-font-size, 2rem);
      }
      p {
        font-family: var(--font-family-secondary);
      }
      .outro-text {
        text-align: var(--outro-text-text-align, center);
        margin-top: var(--outro-text-margin-top, 120px);
      }
      a {
        color: var(--a-color, var(--color-secondary, pink));
        text-decoration: var(--text-decoration, none);
      }
      a:hover {
        color: var(--a-color-hover, var(--color-hover-secondary, green));
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > * {
          margin: var(--content-spacing-mobile, 0 auto);
          width: var(--content-width-mobile, 90%);
        }
        .outro-text {
          margin-top: var(--outro-text-margin-top-mobile, 75px);
        }
      }
    `
  }
}