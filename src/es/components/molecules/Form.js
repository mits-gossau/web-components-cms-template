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
      if (this.form) {
        const xhr = new XMLHttpRequest()
        const method = this.form.getAttribute("method") || "POST"
        const action = this.form.getAttribute("action") || ""

        xhr.open(method, action, false) // TODO async?
        xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log(xhr.responseText)
            } else {
              console.error(xhr.statusText)
            }
          }
        }
        xhr.onerror = function (e) {
          console.error(xhr.statusText)
        }

        const body = this.getAllInputValues(this.form)
        console.log(body);
        xhr.send(body)
      }
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
   * extracts all input values and returns as JSON object
   *
   * @return {string}
   */
  getAllInputValues(form) {
    if (form) {
      
      const inputArray = [...this.root.querySelectorAll("a-text-field, a-radio, a-select")].map(i =>
        JSON.parse(
        `{
          "${i.getAttribute("name")}": "${i.getAttribute("value")}"
        }`
      ))
      return JSON.stringify(inputArray)
    }
    return "[{}]"
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
        flex-direction: var(--form-flex-direction, column);
        align-items: var(--form-align-items, center);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          display: var(--display-mobile, var(--display, block));
        }
        :host form {
          display: var(--form-display-mobile, var(--form-display, flex));
          flex-direction: var(--form-flex-direction-mobile, var(--form-flex-direction, column));
          align-items: var(--form-align-items-mobile, var(--form-align-items, center));
        }
      }
    `
  }

  get form () {
    return this.root.querySelector('form')
  }

}
