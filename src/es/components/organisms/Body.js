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
        font-size: var(--h1-font-size, min(5rem, 10vw));
        font-family: var(--h1-font-family, var(--font-family-bold));
        line-height: var(--h1-line-height, normal);
        text-align: var(--h1-text-align, start);
        word-break:var(--h1-word-break, normal);
      }
      h2 {
        color: var(--h2-color, var(--color, black));
        font-size: var(--h2-font-size, min(4rem, 10vw));
        font-family: var(--h2-font-family, var(--font-family-bold));
        line-height: var(--h2-line-height, normal);
        text-align: var(--h2-text-align, start);
        word-break:var(--h2-word-break, normal);
      }
      h3 {
        color: var(--h3-color, var(--color, black));
        font-size: var(--h3-font-size, min(3rem, 10vw));
        font-family: var(--h3-font-family, var(--font-family-bold));
        line-height: var(--h3-line-height, normal);
        text-align: var(--h3-text-align, start);
        word-break:var(--h3-word-break, normal);
      }
      h4 {
        color: var(--h4-color, var(--color, black));
        font-size: var(--h4-font-size, min(2rem, 10vw));
        font-family: var(--h4-font-family);
        line-height: var(--h4-line-height, normal);
        text-align: var(--h4-text-align, start);
        word-break:var(--h4-word-break, normal);
      }
      h5 {
        color: var(--h5-color, var(--color, black));
        font-size: var(--h5-font-size, min(1.5rem, 10vw));
        font-family: var(--h5-font-family, var(--font-family-secondary));
        line-height: var(--h5-line-height, normal);
        text-align: var(--h5-text-align, start);
        word-break:var(--h5-word-break, normal);
      }
      p {
        font-family: var(--font-family-secondary);
        text-align: var(--p-text-align, start);
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
        h1 {
          font-size: var(--h1-font-size-mobile, min(5rem, 14vw));
          line-height: var(--h1-line-height-mobile, normal);
          word-break:var(--h1-word-break-mobile, normal);
        }
        h2 {
          font-size: var(--h2-font-size-mobile, min(4rem, 14vw));
          line-height: var(--h2-line-height-mobile, normal);
          word-break:var(--h2-word-break-mobile, normal);
        }
        h3 {
          font-size: var(--h3-font-size-mobile, min(3rem, 14vw));
          line-height: var(--h3-line-height-mobile, normal);
          word-break:var(--h3-word-break-mobile, normal);
        }
        h4 {
          font-size: var(--h4-font-size-mobile, min(2rem, 14vw));
          line-height: var(--h4-line-height-mobile, normal);
          word-break:var(--h4-word-break-mobile, normal);
        }
        h5 {
          font-size: var(--h5-font-size-mobile, min(1.5rem, 14vw));
          line-height: var(--h5-line-height-mobile, normal);
          word-break:var(--h5-word-break-mobile, normal);
        }
        .outro-text {
          margin-top: var(--outro-text-margin-top-mobile, 50px);
        }
      }
    `
  }
}