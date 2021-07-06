// @ts-check
import { BaseFooter } from '../web-components-cms-template/src/es/components/organisms/Footer.js'

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
export default class Footer extends BaseFooter() {
  constructor (...args) {
    super()
  }

  connectedCallback () {
    this.html = `<h1>Testing</h1>`
  }
}