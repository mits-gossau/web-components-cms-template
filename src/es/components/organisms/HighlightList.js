// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class HighlightList
 * @type {CustomElementConstructor}
 */
export default class HighlightList extends Shadow() {
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
        grid-area: highlight-list;
        margin: var(--content-margin) auto;
      }
      :host > *:not(style):not(h1):first-Child {
        border-top: 1px solid var(--hr-color);
      }
      :host > *:not(style) {
        border-bottom: 1px solid var(--hr-color);
        display: flex;
        gap: calc(var(--content-margin) / 2);
        padding: var(--content-margin) 0;
        margin: 0 auto;
        width: var(--content-width);
      }
      :host > h1 {
        display: block;
        font-family: var(--font-family-secondary);
        font-size: 2.5rem;
        font-weight: var(--font-weight, 300);
        text-align: center;
        text-transform: uppercase;
      }
      @media only screen and (max-width: 1000px) {
        :host > *:not(style) {
          flex-wrap: wrap;
        }
      }
    `
  }
}