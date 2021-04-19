// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * ButtonWrapper is a wrapper for a button element
 * Example at: /src/es/components/pages/ClassicsSearch.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class ButtonWrapper
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @css {
 *  
 * }
 */
export default class Link extends Shadow() {
  constructor (...args) {
    super(...args)
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
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        border: var(--border, 2px solid var(--color)); 
        width: var(--width, unset);
        height: var(--height, unset);
        display: var(--display, block)
      }
      :host button {
        width: var(--button-width, 70px);
        height: var(--button-height, 85px);
        transition: var(--button-transition, 0.3s all);
        border: var(--button-border, none);
        background: url(../../../img/search_icon_yellow.png) var(--background-color) no-repeat center;
        padding: var(--button-padding, 0);
        cursor: var(--button-cursor, pointer);
      }
      :host button:focus,
      :host button:hover,
      :host button:active {
        background: url(../../../img/search_icon_blue.png) var(--color) no-repeat center;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      }
    `
  }

}
