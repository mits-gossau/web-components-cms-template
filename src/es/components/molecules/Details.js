// @ts-check
import Details from '../web-components-cms-template/src/es/components/molecules/Details.js'

/* global self */
/* global Link */
/* global customElements */

/* global CustomEvent */

/**
 * MIndustry Details (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) aka. Bootstrap accordion
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Details
 * @type {CustomElementConstructor}
 * @css {
 *  --text-align, center
 *  --margin, 0
 *  --padding, 0
 *  --marker-display, none
 *  --marker-content, ""
 *  --summary-cursor, pointer
 *  --summary-text-decoration, underline
 *  --summary-outline, none
 *  --summary-margin, 0
 *  --summary-padding, 0
 *  --summary-text-decoration-open, none
 *  --summary-child-margin, 0
 *  --summary-child-padding, 0
 *  --summary-child-margin-open, 0
 *  --summary-child-padding-open, 0
 *  --child-margin, 0
 *  --child-padding, 0
 *  --animation, 0.1s ease
 *  --child-margin-open, 0
 *  --child-padding-open, 0
 *  --a-color, var(--color)
 *  --close-cursor, pointer
 *  --close-display, block
 *  --close-text-decoration, underline
 *  --close-text-transform, uppercase
 * }
 * @attribute {
 *  {boolean} [open=false] opens the details
 *  {string} [openEventName='open'] the event to which it listens on body
 *  {has} [scroll-into-view=n.a.] scrolls into view if set
 * }
 */
 export default class MIndustryDetails extends Details {
  constructor (...args) {
    super(...args)
  }

 renderCSS () {
   super.renderCSS()
    this.css = /* css */`
      :host {
        display: var(--display, block);
        padding: var(--padding, 15px);
        border-bottom: var(--border-bottom, 1px solid white);
      }
      :host ul {
        list-style-type: var(--ul-list-style-type, none);
      }
      :host ul li {
        padding: var(--li-padding, 0 0 20px 0);
      }
      :host ul li a {
        color: var(--a-color, white);
        text-decoration: var(--a-text-decoration, none);
        font-size: var(--a-font-size, 14px);
      }
      :host details summary {
        padding: var(--summary-padding, 0 0 20px 0);
      }
      :host details summary > div,
      :host details summary h3 {
        display: inline;
      }
      :host details summary h3 {
        font-weight: var(--summary-h3-font-weight, 400);
      }
      :host details summary h3,
      :host details summary::marker {
        font-size: var(--summary-h3-font-size, 18px);
        color: var(--color, white);
      }
      
    `;
 }
}