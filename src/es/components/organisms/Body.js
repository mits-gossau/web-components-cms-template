// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global location */
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
  constructor (...args) {
    super(...args)

    this.clickAnchorEventListener = event => {
      let element = null
      if (event && event.detail && event.detail.selector && (element = this.root.querySelector(event.detail.selector))) element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    document.body.addEventListener(this.getAttribute('click-anchor') || 'click-anchor', this.clickAnchorEventListener)
    if (location.hash) {
      self.addEventListener('load', event => this.clickAnchorEventListener({ detail: { selector: location.hash } }), { once: true })
      document.body.addEventListener(this.getAttribute('wc-config-load') || 'wc-config-load', event => setTimeout(() => this.clickAnchorEventListener({ detail: { selector: location.hash } }), 1000), { once: true })
    }
  }

  disconnectedCallback () {
    document.body.removeEventListener(this.getAttribute('click-anchor') || 'click-anchor', this.clickAnchorEventListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
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
      :host > main {
        padding: var(--main-padding, 0);
      }
      :host > main > * {
        margin: var(--content-spacing, unset) auto;  /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        width: var(--content-width, 80%);
      }
      :host > main > span, :host > main > div, :host > main > p, :host > main > a, :host > main > article, :host > main > ul, :host > main > ol, :host > main > section, :host > main > h1, :host > main > h2, :host > main > h3, :host > main > h4, :host > main > h5, :host > main > h6 {
        width: var(--content-width-not-web-component, 80%);
      }
      :host > main h1 {
        color: var(--h1-color, var(--color, black));
        font-size: var(--h1-font-size, min(5rem, 10vw));
        font-family: var(--h1-font-family, var(--font-family-bold));
        font-weight: var(--h1-font-weight, var(--font-weight, normal));
        line-height: var(--h1-line-height, normal);
        text-align: var(--h1-text-align, start);
        word-break: var(--h1-word-break, normal);
        text-transform: var(--h1-text-transform, none);
        margin: var(--h1-margin, var(--content-spacing, unset)) auto;
        padding: var(--h1-padding, unset);
      }
      :host > main h2 {
        color: var(--h2-color, var(--color, black));
        font-size: var(--h2-font-size, min(4rem, 10vw));
        font-family: var(--h2-font-family, var(--font-family-bold));
        font-weight: var(--h2-font-weight, var(--font-weight, normal));
        line-height: var(--h2-line-height, normal);
        text-align: var(--h2-text-align, start);
        word-break: var(--h2-word-break, normal);
        text-transform: var(--h2-text-transform, none);
        margin: var(--h2-margin, var(--content-spacing, unset)) auto;
        padding: var(--h2-padding, unset);
      }
      :host > main h3 {
        color: var(--h3-color, var(--color, black));
        font-size: var(--h3-font-size, min(3rem, 10vw));
        font-family: var(--h3-font-family, var(--font-family-bold));
        font-weight: var(--h3-font-weight, var(--font-weight, normal));
        line-height: var(--h3-line-height, normal);
        text-align: var(--h3-text-align, start);
        word-break: var(--h3-word-break, normal);
        text-transform: var(--h3-text-transform, none);
        margin: var(--h3-margin, var(--content-spacing, unset)) auto;
        padding: var(--h3-padding, unset);
      }
      :host > main h4 {
        color: var(--h4-color, var(--color, black));
        font-size: var(--h4-font-size, min(2rem, 10vw));
        font-family: var(--h4-font-family);
        font-weight: var(--h4-font-weight, var(--font-weight, normal));
        line-height: var(--h4-line-height, normal);
        text-align: var(--h4-text-align, start);
        word-break: var(--h4-word-break, normal);
        text-transform: var(--h4-text-transform, none);
        margin: var(--h4-margin, var(--content-spacing, unset)) auto;
        padding: var(--h4-padding, unset);
      }
      :host > main h5 {
        color: var(--h5-color, var(--color, black));
        font-size: var(--h5-font-size, min(1.5rem, 10vw));
        font-family: var(--h5-font-family, var(--font-family-secondary));
        font-weight: var(--h5-font-weight, var(--font-weight, normal));
        line-height: var(--h5-line-height, normal);
        text-align: var(--h5-text-align, start);
        word-break: var(--h5-word-break, normal);
        text-transform: var(--h5-text-transform, none);
        margin: var(--h5-margin, var(--content-spacing, unset)) auto;
        padding: var(--h5-padding, unset);
      }
      :host > main h6 {
        color: var(--h6-color, var(--color, black));
        font-size: var(--h6-font-size, min(1.5rem, 10vw));
        font-family: var(--h6-font-family, var(--font-family-secondary));
        font-weight: var(--h6-font-weight, var(--font-weight, normal));
        line-height: var(--h6-line-height, normal);
        text-align: var(--h6-text-align, start);
        word-break: var(--h6-word-break, normal);
        text-transform: var(--h6-text-transform, none);
        margin: var(--h6-margin, var(--content-spacing, unset)) auto;
        padding: var(--h6-padding, unset);
      }
      :host > main p {
        font-family: var(--p-font-family, var(--font-family-secondary));
        font-weight: var(--p-font-weight, var(--font-weight, normal));
        text-align: var(--p-text-align, start);
        text-transform: var(--p-text-transform, none);
        margin: var(--p-margin, var(--content-spacing, unset)) auto;
      }
      :host > main a {
        color: var(--a-color, var(--color-secondary, var(--color, pink)));
        font-weight: var(--a-font-weight, var(--font-weight, normal));
        text-align: var(--a-text-align, unset);
        text-decoration: var(--a-text-decoration, var(--text-decoration, none));
        text-underline-offset: var(--a-text-underline-offset, unset);
        display: var(--a-display, inline);
        margin: var(--a-margin, var(--content-spacing, unset)) auto;
      }
      :host > main * a {
        display: var(--any-a-display, var(--a-display, inline));
      }
      :host > main a:hover, :host > main a:active, :host > main a:focus {
        color: var(--a-color-hover, var(--color-hover-secondary, var(--color-hover, var(--color, green))));
        text-decoration: var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none))));
      }
      :host > main ul {
        text-align: var(--ul-text-align, var(--ol-text-align, start));
        display: var(--ul-display, var(--ol-display, block));
        flex-direction: var(--ul-flex-direction, var(--ol-flex-direction, column));
        box-sizing: var(--ul-box-sizing, var(--ol-box-sizing, border-box));
      }
      :host > main ul li, :host > main ol li {
        align-self: var(--li-align-self, auto);
      }
      :host > main ol {
        text-align: var(--ol-text-align, var(--ul-text-align, start));
        display: var(--ol-display, var(--ul-display, block));
        flex-direction: var(--ol-flex-direction, var(--ul-flex-direction, column));
        box-sizing: var(--ol-box-sizing, var(--ul-box-sizing, border-box));
      }
      :host > main .bold, :host > main strong {
        font-family: var(--strong-font-family, var(--font-family-bold));
        font-weight: var(--strong-font-weight, var(--font-weight, normal));
        text-transform: var(--strong-text-transform, none);
      }
      .orchestra a {
        --any-a-display: var(--orchestra-a-display);
        --a-text-decoration: var(--orchestra-a-text-decoration);
      }
      .orchestra p {
        --p-margin: var(--orchestra-p-margin);
        --p-text-transform: var(--orchestra-p-text-transform);
      }
      .tickets a {
        --a-text-decoration: var(--tickets-a-text-decoration);
        --any-a-display: var(--tickets-a-display);
      }
      .outro-text {
        text-align: var(--outro-text-text-align, center);
        margin-top: var(--outro-text-margin-top, 100px) auto;
      }
      .white{
        background-color: var(--color);
        width: calc(100% - 2rem);
        padding: 1rem;
      }
      .spacer {
        display: block;
        height: var(--spacer-height, 15vw);
        margin: 0 auto;
        padding: 0;
        width: 100%;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > main {
          padding: var(--main-padding-mobile, var(--main-padding, 0));
        }
        :host > main > * {
          margin: var(--content-spacing-mobile, var(--content-spacing, unset)) auto; /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
          width: var(--content-width-mobile, var(--content-width, 90%));
        }
        :host > main > span, :host > main > div, :host > main > p, :host > main > a, :host > main > article, :host > main > ul, :host > main > ol, :host > main > section, :host > main > h1, :host > main > h2, :host > main > h3, :host > main > h4, :host > main > h5, :host > main > h6 {
          width: var(--content-width-not-web-component-mobile, var(--content-width-not-web-component, var(--content-width-mobile, var(--content-width, 90%))));
        }
        :host > main h1 {
          font-size: var(--h1-font-size-mobile, var(--h1-font-size, min(5rem, 14vw)));
          line-height: var(--h1-line-height-mobile, var(--h1-line-height, normal));
          word-break: var(--h1-word-break-mobile, var(--h1-word-break, normal));
          text-transform: var(--h1-text-transform-mobile, var(--h1-text-transform, normal));
          margin: var(--h1-margin-mobile, var(--h1-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host > main h2 {
          font-size: var(--h2-font-size-mobile, var(--h2-font-size, min(4rem, 14vw)));
          line-height: var(--h2-line-height-mobile, var(--h2-line-height, normal));
          word-break: var(--h2-word-break-mobile, var(--h2-word-break, normal));
          text-transform: var(--h2-text-transform-mobile, var(--h2-text-transform, normal));
          margin: var(--h2-margin-mobile, var(--h2-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host > main h3 {
          font-size: var(--h3-font-size-mobile, var(--h3-font-size, min(3rem, 14vw)));
          line-height: var(--h3-line-height-mobile, var(--h3-line-height, normal));
          word-break: var(--h3-word-break-mobile, var(--h3-word-break, normal));
          text-transform: var(--h3-text-transform-mobile, var(--h3-text-transform, normal));
          margin: var(--h3-margin-mobile, var(--h3-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host > main h4 {
          font-size: var(--h4-font-size-mobile, var(--h4-font-size, min(2rem, 14vw)));
          line-height: var(--h4-line-height-mobile, var(--h4-line-height, normal));
          word-break: var(--h4-word-break-mobile, var(--h4-word-break, normal));
          text-transform: var(--h4-text-transform-mobile, var(--h4-text-transform, normal));
          margin: var(--h4-margin-mobile, var(--h4-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host > main h5 {
          font-size: var(--h5-font-size-mobile, var(--h5-font-size, min(1.5rem, 14vw)));
          line-height: var(--h5-line-height-mobile, var(--h5-line-height, normal));
          word-break: var(--h5-word-break-mobile, var(--h5-word-break, normal));
          text-transform: var(--h5-text-transform-mobile, var(--h5-text-transform, normal));
          margin: var(--h5-margin-mobile, var(--h5-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host > main h6 {
          font-size: var(--h6-font-size-mobile, var(--h6-font-size, min(1.5rem, 14vw)));
          line-height: var(--h6-line-height-mobile, var(--h6-line-height, normal));
          word-break: var(--h6-word-break-mobile, var(--h6-word-break, normal));
          text-transform: var(--h6-text-transform-mobile, var(--h6-text-transform, normal));
          margin: var(--h6-margin-mobile, var(--h6-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host > main p {
          text-transform: var(--p-text-transform-mobile, var(--p-text-transform, none));
          margin: var(--p-margin-mobile, var(--p-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host > main a {
          margin: var(--a-margin-mobile, var(--a-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        .outro-text {
          margin-top: var(--outro-text-margin-top-mobile, 50px) auto;
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
