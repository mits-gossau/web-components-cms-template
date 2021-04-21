// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Form is a wrapper for a form
 * Example at: /src/es/components/pages/ClassicsSearch.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Form
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @css {
 *  --display [block]
 *  --form-display [flex]
 *  --form-align-items [center]
 *  --display-mobile [block]
 *  --form-display-mobile [flex]
 *  --form-align-items-mobile [center]
 * }
 */
export default class Form extends Shadow() {
  constructor (...args) {
    super(...args)

    this.submitEventListener = event =>  {
      if (this.form) this.form.submit()
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.addEventListener("form-submit", this.submitEventListener)
  }

  disconnectedCallback() {
    this.removeEventListener("form-submit", this.submitEventListener)
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
        display: var(--display, block);
      }
      :host form {
        display: var(--form-display, flex);
        align-items: var(--form-align-items, center);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          display: var(--display-mobile, block);
        }
        :host form {
          display: var(--form-display-mobile, flex);
          align-items: var(--form-align-items-mobile, center);
        }
      }
    `
  }

  get form () {
    return this.root.querySelector('form')
  }

}
