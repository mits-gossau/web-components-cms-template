// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class TeaserWrapper
 * @type {CustomElementConstructor}
 * @css {
 *  --m-teaser-margin [20px]
 *  --m-teaser-min-width [370px]
 * }
 */
export default class TeaserWrapper extends Shadow() {
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
   * renders the o-teaser-wrapper css
   *
   * @return {void}
   */
  renderCSS () {
    let teaserAmount = this.root.querySelectorAll("m-teaser").length;
    this.css = /* css */`
      :host {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `;

    if (teaserAmount % 2 == 0) {
      this.css += /* css */`
      :host m-teaser {
        min-width: min(var(--m-teaser-min-width, 370px), 100%);
        width: 100%;
        max-width: calc(50% - 2 * var(--m-teaser-margin, 20px));
        margin: var(--m-teaser-margin, 20px);
      }
      
      `;
    } else {
      this.css += /* css */`
      :host m-teaser {
        min-width: min(var(--m-teaser-min-width, 370px), 100%);
        width: 100%;
        max-width: calc(100% / 3 - 2 * var(--m-teaser-margin, 20px));
        margin: var(--m-teaser-margin, 20px);
      }
      `;
    }
  }


}