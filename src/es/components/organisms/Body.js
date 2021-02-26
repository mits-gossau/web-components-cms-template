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
        margin: var(--content-spacing, 40px) auto;  /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        width: var(--content-width, 80%);
      }
      :host > span, :host > div, :host > p, :host > ul, :host > ol {
        width: var(--content-width-not-web-component, 80%);
      }
      h1 {
        color: var(--h1-color, var(--color, black));
        font-size: var(--h1-font-size, 5rem);
        font-family: var(--h1-font-family, var(--font-family-bold));
      }
      h2 {
        font-size: var(--h2-font-size, 4rem);
        font-family: var(--h2-font-family, var(--font-family-bold));
      }
      h3 {
        font-size: var(--h3-font-size, 3rem);
        font-family: var(--h3-font-family, var(--font-family-bold));
      }
      h4 {
        font-size: var(--h4-font-size, 2rem);
        font-family: var(--h4-font-family);
      }
      h5 {
        font-family: var(--h5-font-family, var(--font-family-secondary));
      }
      p {
        font-family: var(--font-family-secondary);
      }
      .outro-text {
        text-align: var(--outro-text-text-align, center);
        margin-top: var(--outro-text-margin-top, 100px);
      }
      a {
        color: var(--a-color, var(--color-secondary, pink));
        text-decoration: var(--text-decoration-a, none);
      }
      a:hover {
        color: var(--a-color-hover, var(--color-hover-secondary, green));
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > * {
          margin: 0 auto; /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
          width: var(--content-width-mobile, 90%);
        }
        :host > span, :host > div, :host > p, :host > ul, :host > ol, :host > section, :host > h1, :host > h2, :host > h3, :host > h4, :host > h5 {
          width: var(--content-width-not-web-component-mobile, 90%);
        }
        .outro-text {
          margin-top: var(--outro-text-margin-top-mobile, 50px);
        }
      }
    `
  }
}