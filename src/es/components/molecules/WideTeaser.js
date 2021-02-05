// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class WideTeaser
 * @type {CustomElementConstructor}
 * @css {
 *  --background-color [#333333]
 *  --background-color-hover [#810917]
 *  --h4-color [white]
 *  --p-color [white]
 *  --h4-font-size [1.2rem]
 *  --h4-font-weight [300]
 *  --p-font-size [1.1rem]
 *  --font-family ['Roboto', (fallback)]
 * }
 * 
 */
export default class WideTeaser extends Shadow() {
  constructor () {
    super()
  }

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
   * renders the m-wide-teaser css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host figure {
        display: flex;
        background-color: var(--background-color, #333333);
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        margin: 0;
        padding: 30px 0;
      }
      :host figure:hover {
        background-color: var(--background-color-hover, #810917);
      }
      :host p, :host h4, :host a {
        font-family: var(--font-family, "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif);
        color: var(--color, white);
      }
      :host p {
        font-size: var(--p-font-size, 1.1rem);
        margin: 5px 0 10px 0;
      }
      :host h4 {
        font-size: var(--h4-font-size, 1.2rem);
        font-weight: var(--h4-font-weight, 300);
        margin: 0 0 15px 0;
      }
      :host .moreLink {
        display: flex;
      }
      :host .moreLink a {
        text-decoration: none;
        font-size: var(--h4-font-size, 1.2rem);
      }
      :host figcaption {
        width: 45%;
      }
      :host figcaption a-arrow {
        margin-right: 5px;
      }
      :host picture {
        width: 25%;
        margin-right: 30px;
      }
      :host picture img {
        width: auto;
        height: auto;
        max-width: 100%;
      }

      @media only screen and  (max-width: 768px) {
        :host {
          width: 90%;
        }
      }
    `
  }
}