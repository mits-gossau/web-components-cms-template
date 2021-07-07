// @ts-check
import Footer from '../web-components-cms-template/src/es/components/organisms/Footer.js'

/* global self */
/* global Link */
/* global customElements */

/**
 * MIndustry Footer
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [logo-load="logo-load"]
 *  {boolean} [homepage] for classics homepage styles (only one logo at right side)
 * }
 * @css {
 *  NOTE: grid-area: footer;
 *  --background-color [black]
 *  --z-index [100]
 *  --content-spacing [40px]
 *  --a-link-content-spacing [0]
 *  --a-link-font-size [1rem]
 *  --a-link-font-size-2 [1rem]
 *  --list-style [none]
 *  --align-items [start]
 *  --font-size [1rem]
 *  --p-margin [0]
 * }
 */
export default class MIndustryFooter extends Footer {
  constructor (...args) {
    super(...args)
  }

  connectedCallback() {
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
   * renders the mindustry-o-footer css
   *
   * @return {void}
   */
 renderCSS () {
   super.renderCSS()
    this.css = /* css */`
      .testingclass {
        background-color: red;
      }
    `;
 }

}