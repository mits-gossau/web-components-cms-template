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
 *  --content-width [80vw]
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
        width: var(--content-width, 80vw);
      }
      h1 {
        color: var(--h1-color, var(--color, black));
        font-size: 6rem;
      }
      h2 {
        font-size: 5rem;
        font-family: var(--font-family-secondary);
      }
      h3 {
        font-size: 3rem;
      }
      h4 {
        font-size: 2rem;
      }
      p {
        font-size: 1.5rem;
        font-family: var(--font-family-secondary);
      }
    `
  }
}