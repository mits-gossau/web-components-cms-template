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
 *  --margin [20px]
 *  --min-width [370px]
 *  --justify-content [center]
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
        justify-content: var(--justify-content, center);
      }
      :host m-teaser {
        min-width: min(var(--min-width, 370px), 100%);
        width: 100%;
        margin: var(--margin, 20px);
      }
    `;

    if (teaserAmount % 2 == 0) {
      this.css = /* css */`
      :host m-teaser {
        max-width: calc(50% - 2 * var(--margin, 20px));
      }
      
      `;
    } else {
      this.css = /* css */`
      :host m-teaser {
        max-width: calc(100% / 3 - 2 * var(--margin, 20px));
      }
      `;
    }
  }
}