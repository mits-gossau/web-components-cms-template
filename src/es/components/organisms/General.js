// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class General
 * @type {CustomElementConstructor}
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
   * renders the o-highlight-list css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        grid-area: general;
      }
      :host > * {
        margin: var(--content-margin) auto;
        width: var(--content-width);
      }
      h1 {
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