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
 *  {string} [type] used to determine what should happen on form-submit success/failure
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

    this.submitEventListener = event => {
      if (this.form) {
        const method = this.form.getAttribute('method')
        const action = this.form.getAttribute('action')
        const body = this.getAllInputValues(this.form)

        fetch(action, { method, body })
          .then(response => {
            if (response.ok) {
              this.submitSuccess(response, this.getAttribute('type'))
            } else {
              this.submitFailure(response, this.getAttribute('type'))
            }
          })
          .catch(error => {
            this.submitFailure(error, this.getAttribute('type'))
          })
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.addEventListener('form-submit', this.submitEventListener)
  }

  disconnectedCallback () {
    this.removeEventListener('form-submit', this.submitEventListener)
  }

  /**
   * Form-submit success function
   *
   * @return {void}
   */
  submitSuccess (response, type) {
    if (type === 'search') {
      if (this.searchResultsContainer) {
        response.text().then(results => {
          this.searchResultsContainer.innerHTML = results
        })
      } else {
        console.error('<div class="searchResultsContainer"> for adding search-results was not found')
      }
    } else if (type === 'newsletter') {
      // TODO display success message
    } else {
      console.warn('Form submit was successful, but type is missing on <m-form>')
    }
  }

  /**
   * Form-submit success function
   *
   * @return {void}
   */
  submitFailure (response, type) {
    console.error(`Error submitting form of type ${type}: `, response)
  }

  /**
   * Extracts all input values and returns the name/value pairs as FormData for submitting
   * Values are being manually extracted because form does not see the inputs inside the web components due to the Shadow-DOM
   *
   * @return {FormData}
   */
  getAllInputValues (form) {
    if (form) {
      const formData = new FormData();
      // TODO in a future step automatically convert all native inputs to have the WC-Wrappers
      [...this.root.querySelectorAll('a-text-field, a-radio, a-checkbox, a-select, a-date, input')].forEach(i =>
        formData.append(i.getAttribute('name'), i.getAttribute('value'))
      )
      return formData
    }
    return new FormData()
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

  get searchResultsContainer () {
    if (this.root.querySelector('.searchResultsContainer'))
      return this.root.querySelector('.searchResultsContainer')
    
    const searchResultsContainer = document.createElement('DIV').classList.add('searchResultsContainer')
    this.html = searchResultsContainer
    return searchResultsContainer
  }
}
