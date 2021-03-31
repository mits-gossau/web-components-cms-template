// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

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
    return !this.root.querySelector('main')
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
      :host > main > * {
        margin: var(--content-spacing, unset) auto;  /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        width: var(--content-width, 80%);
      }
      :host > main > span, :host > main > div, :host > main > p, :host > main > ul, :host > main > ol, :host > main > section, :host > main > h1, :host > main > h2, :host > main > h3, :host > main > h4, :host > main > h5 {
        width: var(--content-width-not-web-component, 80%);
      }
      :host > main h1 {
        color: var(--h1-color, var(--color, black));
        font-size: var(--h1-font-size, min(5rem, 10vw));
        font-family: var(--h1-font-family, var(--font-family-bold));
        line-height: var(--h1-line-height, normal);
        text-align: var(--h1-text-align, start);
        word-break: var(--h1-word-break, normal);
        text-transform: var(--h1-text-transform, normal);
        margin: var(--h1-margin, var(--content-spacing, unset)) auto;
      }
      :host > main h2 {
        color: var(--h2-color, var(--color, black));
        font-size: var(--h2-font-size, min(4rem, 10vw));
        font-family: var(--h2-font-family, var(--font-family-bold));
        line-height: var(--h2-line-height, normal);
        text-align: var(--h2-text-align, start);
        word-break: var(--h2-word-break, normal);
        text-transform: var(--h2-text-transform, normal);
        margin: var(--h2-margin, var(--content-spacing, unset)) auto;
      }
      :host > main h3 {
        color: var(--h3-color, var(--color, black));
        font-size: var(--h3-font-size, min(3rem, 10vw));
        font-family: var(--h3-font-family, var(--font-family-bold));
        line-height: var(--h3-line-height, normal);
        text-align: var(--h3-text-align, start);
        word-break: var(--h3-word-break, normal);
        text-transform: var(--h3-text-transform, normal);
        margin: var(--h3-margin, var(--content-spacing, unset)) auto;
      }
      :host > main h4 {
        color: var(--h4-color, var(--color, black));
        font-size: var(--h4-font-size, min(2rem, 10vw));
        font-family: var(--h4-font-family);
        line-height: var(--h4-line-height, normal);
        text-align: var(--h4-text-align, start);
        word-break: var(--h4-word-break, normal);
        text-transform: var(--h4-text-transform, normal);
        margin: var(--h4-margin, var(--content-spacing, unset)) auto;
      }
      :host > main h5 {
        color: var(--h5-color, var(--color, black));
        font-size: var(--h5-font-size, min(1.5rem, 10vw));
        font-family: var(--h5-font-family, var(--font-family-secondary));
        line-height: var(--h5-line-height, normal);
        text-align: var(--h5-text-align, start);
        word-break: var(--h5-word-break, normal);
        text-transform: var(--h5-text-transform, normal);
        margin: var(--h5-margin, var(--content-spacing, unset)) auto;
      }
      :host > main p {
        font-family: var(--font-family-secondary);
        text-align: var(--p-text-align, start);
        margin: var(--p-margin, var(--content-spacing, unset)) auto;
      }
      :host > main a {
        color: var(--a-color, var(--color-secondary, pink));
        text-align: var(--a-text-align, unset);
        text-decoration: var(--text-decoration-a, none);
        text-underline-offset: var(--text-underline-offset-a, unset);
        display: var(--a-display, inline);
        margin: var(--a-margin, var(--content-spacing, unset)) auto;
      }
      :host > main a:hover {
        color: var(--a-color-hover, var(--color-hover-secondary, green));
      }
      .outro-text {
        text-align: var(--outro-text-text-align, center);
        margin-top: var(--outro-text-margin-top, 100px);
      }
      .spacer {
        display: block;
        height: var(--spacer-height, 15vw);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > main > * {
          margin: 0 auto; /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
          width: var(--content-width-mobile, 90%);
        }
        :host > main > span, :host > main > div, :host > main > p, :host > main > ul, :host > main > ol, :host > main > section, :host > main > h1, :host > main > h2, :host > main > h3, :host > main > h4, :host > main > h5 {
          width: var(--content-width-not-web-component-mobile, 90%);
        }
        :host > main h1 {
          font-size: var(--h1-font-size-mobile, var(--h1-font-size, min(5rem, 14vw)));
          line-height: var(--h1-line-height-mobile, var(--h1-line-height, normal));
          word-break: var(--h1-word-break-mobile, var(--h1-word-break, normal));
          text-transform: var(--h1-text-transform-mobile, var(--h1-text-transform, normal));
          margin: var(--h1-margin-mobile, var(--h1-margin));
        }
        :host > main h2 {
          font-size: var(--h2-font-size-mobile, var(--h2-font-size, min(4rem, 14vw)));
          line-height: var(--h2-line-height-mobile, var(--h2-line-height, normal));
          word-break: var(--h2-word-break-mobile, var(--h2-word-break, normal));
          text-transform: var(--h2-text-transform-mobile, var(--h2-text-transform, normal));
          margin: var(--h2-margin-mobile, var(--h2-margin));
        }
        :host > main h3 {
          font-size: var(--h3-font-size-mobile, var(--h3-font-size, min(3rem, 14vw)));
          line-height: var(--h3-line-height-mobile, var(--h3-line-height, normal));
          word-break: var(--h3-word-break-mobile, var(--h3-word-break, normal));
          text-transform: var(--h3-text-transform-mobile, var(--h3-text-transform, normal));
          margin: var(--h3-margin-mobile, var(--h3-margin));
        }
        :host > main h4 {
          font-size: var(--h4-font-size-mobile, var(--h4-font-size, min(2rem, 14vw)));
          line-height: var(--h4-line-height-mobile, var(--h4-line-height, normal));
          word-break: var(--h4-word-break-mobile, var(--h4-word-break, normal));
          text-transform: var(--h4-text-transform-mobile, var(--h4-text-transform, normal));
          margin: var(--h4-margin-mobile, var(--h4-margin));
        }
        :host > main h5 {
          font-size: var(--h5-font-size-mobile, var(--h5-font-size, min(1.5rem, 14vw)));
          line-height: var(--h5-line-height-mobile, var(--h5-line-height, normal));
          word-break: var(--h5-word-break-mobile, var(--h5-word-break, normal));
          text-transform: var(--h5-text-transform-mobile, var(--h5-text-transform, normal));
          margin: var(--h5-margin-mobile, var(--h5-margin));
        }
        .outro-text {
          margin-top: var(--outro-text-margin-top-mobile, 50px);
        }
        .spacer {
          height: var(--spacer-height-mobile, 15vw);
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    const main = this.root.appendChild(document.createElement('main'))
    Array.from(this.root.children).forEach(node => {
      if (node === main || node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      main.appendChild(node)
    })
  }
}
