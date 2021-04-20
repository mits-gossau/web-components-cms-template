// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Button is a wrapper for a button element
 * Example at: /src/es/components/pages/ClassicsSearch.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Button
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @css {
 * 
 * --border [2px solid var(--color)] 
 * --width [unset]
 * --height [unset]
 * --display [block]
 * --color [green]
 * --button-width [70px]
 * --button-height [85px]
 * --button-transition [0.3s all]
 * --button-border [none]
 * --button-padding [0]
 * --button-cursor [pointer]
 * --background-color [red]
 * --button-font-size [0.8rem]
 * --font-family-bold
 * }
 */
export default class Button extends Shadow() {
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
        background: ${this.getAttribute("icon-src") ? `url("${this.getAttribute("icon-src")}") var(--background-color) no-repeat center` : "var(--background-color)"};
        width: var(--button-width, 70px);
        height: var(--button-height, 85px);
        transition: var(--button-transition, 0.3s all);
        border: var(--button-border, none);
        padding: var(--button-padding, 0);
        cursor: var(--button-cursor, pointer);
        color: var(--color, green);
        font-family: var(--font-family-bold);
        font-size: var(--button-font-size, 0.8rem);
      }
      :host button:focus,
      :host button:hover,
      :host button:active {
        background: ${this.getAttribute("icon-src-secondary") ? `url("${this.getAttribute("icon-src-secondary")}") var(--color) no-repeat center` : "var(--color)"};
        color: var(--background-color, red);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      }
    `
  }

}
