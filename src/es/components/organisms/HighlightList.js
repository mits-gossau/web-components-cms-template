// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * HighlightList is the wrapper of molecules/Highlight.js which also styles a title/h1 for the list of highlights
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class HighlightList
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: highlight-list;
 *  --content-margin [40px]
 *  --hr-color [black]
 *  --content-width [80vw]
 *  --color [black]
 *  --font-family-secondary
 *  --font-size [2.5rem]
 *  --font-weight [300]
 *  --text-align [center]
 *  --text-transform [uppercase]
 * }
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
        margin: var(--content-margin, 40px) auto;
      }
      :host > *:not(style):not(h1):first-Child {
        border-top: 1px solid var(--hr-color, black);
      }
      :host > *:not(style) {
        border-bottom: 1px solid var(--hr-color, black);
        display: flex;
        gap: calc(var(--content-margin, 40px) / 2);
        padding: var(--content-margin, 40px) 0;
        margin: 0 auto;
        width: var(--content-width, 80vw);
      }
      :host > h1 {
        color: var(--color, black);
        display: block;
        font-family: var(--font-family-secondary);
        font-size: var(--font-size, 2.5rem);
        font-weight: var(--font-weight, 300);
        text-align: var(--text-align, center);
        text-transform: var(--text-transform, uppercase);
      }
      @media only screen and (max-width: 1000px) {
        :host > *:not(style) {
          flex-wrap: wrap;
        }
      }
    `
  }
}