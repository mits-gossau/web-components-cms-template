// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class TeaserWrapper
 * @type {CustomElementConstructor}
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
        padding: 30px;
        flex-wrap: wrap;
      }
      :host m-teaser {
        margin: 20px 0;
        margin-right: 30px; 
      }
    `;

    if (teaserAmount === 1) {
      this.css += /* css */`
      :host m-teaser {
        width: 40%;
      }`;
    } else if (teaserAmount % 2 == 0) {
      this.css += /* css */`
      :host m-teaser {
        width: calc((100% - 90px)/2);
      }
      `;
    } else {
      this.css += /* css */`
      :host m-teaser {
        width: calc((100% - 120px)/3);
      }
      `;
    }
  }


}