// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Newsletter expects p, h4, ul > li
 * Example at: /src/es/components/molecules/Newsletter.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Newsletter
 * @type {CustomElementConstructor}
 * @attribute {
 *
 * }
 * @css {
 * --text-align, center
 * --padding, 0
 * --text-transform, uppercase
 * }
 */
export default class Newsletter extends Shadow() {
  connectedCallback () {
    // if (this.shouldComponentRenderCSS())
    this.renderCSS()
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
   * renders the m-Newsletter css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: block;
        text-align: var(--text-align, center);
        padding: var(--padding, 0);
        color: var(--color, yellow);
      }
      :host label {
        text-transform: uppercase;
        font-weight: bold;
      }
      :host .input-Text {
        margin-top: 20px;
        margin-bottom: 5px;
        background-color: var(--background-color);
        border: none;
        border-bottom: 1px solid white;
        width: 100%;
        text-align: center;
      }
      :host .radio{
        display: none;
      }
      
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        
      }
    `
  }
}
