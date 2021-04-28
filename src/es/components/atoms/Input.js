// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Input is a wrapper for any form input
 * Example at: /src/es/components/pages/ClassicsSearch.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Input
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [type] the input type (text, radio, select, checkbox, etc.)
 * }
 * @css {
 * --display [flex]
 * --height [85px]
 * --input-background [none]
 * --color [red]
 * --input-border [none]
 * --flex-grow [0]
 * --flex-direction [column]
 * --border-top [none]
 * --border-bottom [none]
 * --border-right [none]
 * --border-left [none]
 * --text-align [center]
 * --display-mobile [--display]
 * --height-mobile [--height]
 * --input-background-mobile [--input-background]
 * --color-mobile [--color]
 * --input-border-mobile [--input-border]
 * --flex-grow-mobile [--flex-grow]
 * --flex-direction-mobile [--flex-direction]
 * --border-top-mobile [--border-top]
 * --border-bottom-mobile [--border-bottom]
 * --border-right-mobile [--border-right]
 * --border-left-mobile [--border-left]
 * --text-align-mobile [--text-align]
 * --font-family
 * --font-family-bold
 * --p-font-size
 * }
 */
export default class Input extends Shadow() {
  constructor (...args) {
    super()

    this.onChange = event => {
      if (!this.getAttribute('name')) this.setAttribute('name', event.target.name)
      if (event.key === 'Enter') {
        this.dispatchEvent(new CustomEvent('form-submit', {
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      } else {
        this.setAttribute('value', event.target.value)
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.input) {
      this.input.addEventListener('keyup', this.onChange)
      this.input.addEventListener('change', this.onChange)
    }
  }

  disconnectedCallback () {
    if (this.input) {
      this.input.removeEventListener('keyup', this.onChange)
      this.input.removeEventListener('change', this.onChange)
    }
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
        display: var(--display, flex);
        flex-grow: var(--flex-grow, 0);
        flex-direction: var(--flex-direction, column);
        height: var(--height, 85px);     
        border-top: var(--border-top, none);
        border-bottom: var(--border-bottom, none);
        border-left: var(--border-left, none);
        border-right: var(--border-right, none);
        text-align: var(--text-align, center);
      }
      :host(:focus-within) {
        box-shadow: var(--input-box-shadow, inset 0 0 2px 2px var(--color));
      }
      :host > input {
        background: var(--input-background, none);
        padding: var(--input-padding, 0 15px);
        border: var(--input-border, none);
        font-family: var(--font-family);
        font-size: var(--p-font-size);
        text-align: var(--text-align, center);
        color: var(--color, red);
      }
      :host > input:focus {
        outline: var(--input-outline, none);
      }
      ::placeholder {
        color: var(--color);
        opacity: var(--placeholder-opacity, 0.6);
      }
      :host > label {
        font-family: var(--font-family-bold);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          display: var(--display-mobile, var(--display, flex));
          flex-grow: var(--flex-grow-mobile, var(--flex-grow, 0));
          flex-direction: var(--flex-direction-mobile, var(--flex-direction, column));
          height: var(--height-mobile, var(--height, 85px));
          border-top: var(--border-top-mobile, var(--border-top, none));
          border-bottom: var(--border-bottom-mobile, var(--border-bottom, none));
          border-left: var(--border-left-mobile, var(--border-left, none));
          border-right: var(--border-right-mobile, var(--border-right, none));
          text-align: var(--text-align-mobile, var(--text-align, center));
        }
        :host(:focus-within) {
          box-shadow: var(--input-box-shadow-mobile, inset 0 0 1.5px 1.5px var(--color));
        }
        :host > input {
          background: var(--background-mobile, var(--input-background, none));
          font-family: var(--font-family-mobile, var(--font-family));
          font-size: var(--font-size-mobile, var(--p-font-size));
          text-align: var(--text-align-mobile, var(--text-align, center));
          color: var(--color-mobile, var(--color, red));
          border: var(--border-mobile, var(--input-border, none));
        }

        :host > label {
          font-family: var(--font-family-bold-mobile, var(--font-family-bold));
        }
      }
    `
  }


  get input () {
    return this.root.querySelector('input')
  }
}
