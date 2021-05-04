// @ts-check
import Button from '../atoms/Button.js'
import Input from '../atoms/Input.js'
import { Shadow } from '../prototypes/Shadow.js'

/* global fetch */
/* global FormData */
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
            if (event.detail && event.detail.button) event.detail.button.disabled = false
            if (response.ok) {
              this.submitSuccess(response, this.getAttribute('type'))
            } else {
              this.submitFailure(response, this.getAttribute('type'))
            }
          })
          .catch(error => {
            if (event.detail && event.detail.button) event.detail.button.disabled = false
            this.submitFailure(error, this.getAttribute('type'))
          })
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
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
      [...this.root.querySelectorAll('a-input, input')].forEach(i =>
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
      .searchResultsContainer div {
        margin: var(--div-margin, 30px) auto;
      }
      .searchResultsContainer h3 {
          color: var(--h3-color, var(--color, black));
          font-size: var(--h3-font-size, min(3rem, 10vw));
          font-family: var(--h3-font-family, var(--font-family-bold));
          line-height: var(--h3-line-height, normal);
          text-align: var(--h3-text-align, start);
          word-break: var(--h3-word-break, normal);
          text-transform: var(--h3-text-transform, normal);
          margin: var(--h3-margin, var(--content-spacing, unset)) auto;
      }
      .searchResultsContainer h4 {        
          color: var(--h4-color, var(--color, black));
          font-size: var(--h4-font-size, min(2rem, 10vw));
          font-family: var(--h4-font-family);
          line-height: var(--h4-line-height, normal);
          text-align: var(--h4-text-align, start);
          word-break: var(--h4-word-break, normal);
          text-transform: var(--h4-text-transform, normal);
          margin: var(--h4-margin, var(--content-spacing, unset)) auto;
      }
      .searchResultsContainer p {
        font-family: var(--font-family-secondary);
        text-align: var(--p-text-align, start);
        text-transform: var(--p-text-transform, none);
        margin: var(--p-margin, var(--content-spacing, unset)) auto;
      }
      .searchResultsContainer a {
        font-size: var(--a-font-size, 0.9rem);
        color: var(--a-color, var(--color-secondary, var(--color, pink)));
        text-align: var(--a-text-align, unset);
        text-decoration: var(--a-text-decoration, var(--text-decoration, none));
        text-underline-offset: var(--a-text-underline-offset, unset);
        display: var(--a-display, inline);
        margin: var(--a-margin, var(--content-spacing, unset)) auto;
      }
      .searchResultsContainer a:hover, .searchResultsContainer a:focus, .searchResultsContainer a:active {
        color: var(--a-color-hover, var(--color-hover-secondary, var(--color-hover, var(--color, green))));
        text-decoration: var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none))));
      }
      .searchResultsContainer ul {
        padding-left: 15px;
        text-align: var(--ul-text-align, var(--ol-text-align, start));
        display: var(--ul-display, var(--ol-display, block));
        flex-direction: var(--ul-flex-direction, var(--ol-flex-direction, column));
      }
      .searchResultsContainer ul li, .searchResultsContainer ol li {
        align-self: var(--li-align-self, auto);
      }
      .searchResultsContainer ol {
        text-align: var(--ol-text-align, var(--ul-text-align, start));
        display: var(--ol-display, var(--ul-display, block));
        flex-direction: var(--ol-flex-direction, var(--ul-flex-direction, column));
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
        .searchResultsContainer h3 {
          font-size: var(--h3-font-size-mobile, var(--h3-font-size, min(3rem, 14vw)));
          line-height: var(--h3-line-height-mobile, var(--h3-line-height, normal));
          word-break: var(--h3-word-break-mobile, var(--h3-word-break, normal));
          text-transform: var(--h3-text-transform-mobile, var(--h3-text-transform, normal));
          margin: var(--h3-margin-mobile, var(--h3-margin)) auto;
        }
        .searchResultsContainer h4 {
          font-size: var(--h4-font-size-mobile, var(--h4-font-size, min(2rem, 14vw)));
          line-height: var(--h4-line-height-mobile, var(--h4-line-height, normal));
          word-break: var(--h4-word-break-mobile, var(--h4-word-break, normal));
          text-transform: var(--h4-text-transform-mobile, var(--h4-text-transform, normal));
          margin: var(--h4-margin-mobile, var(--h4-margin)) auto;
        }
      }
    `
  }

  /**
  * renders the a-text-field html
  *
  * @return {void}
  */
   renderHTML() {
    this.loadChildComponents().then(children => {
      Array.from(this.root.querySelectorAll('input'))
      .filter(i => i.getAttribute('type') != "hidden").forEach(input => {
        const label = this.root.querySelector(`label[for=${input.getAttribute("name")}]`) || this.root.querySelector(`label[for=${input.getAttribute("id")}]`);
        const aInput = new children[0][1](input, label, { namespace: this.getAttribute('namespace') || ''})
        aInput.setAttribute('type', input.getAttribute('type'))
        input.replaceWith(aInput)
      })
      Array.from(this.root.querySelectorAll('button')).forEach(button => {
        const aButton = new children[1][1](button, { namespace: this.getAttribute('namespace') || '' })
        button.replaceWith(aButton)
      })
    })
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let inputPromise
    try {
      inputPromise = Promise.resolve({ default: Input })
    } catch (error) {
      inputPromise = import('../atoms/Input.js')
    }
    let buttonPromise
    try {
      buttonPromise = Promise.resolve({ default: Button })
    } catch (error) {
      buttonPromise = import('../atoms/Button.js')
    }
    return (this.childComponentsPromise = Promise.all([
      inputPromise.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-input', module.default]
      ),
      buttonPromise.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-button', module.default]
      )
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }

  get form () {
    return this.root.querySelector('form')
  }

  get searchResultsContainer () {
    if (this.root.querySelector('.searchResultsContainer')) { return this.root.querySelector('.searchResultsContainer') }

    const searchResultsContainer = document.createElement('DIV')
    searchResultsContainer.classList.add('searchResultsContainer')
    this.html = searchResultsContainer
    return searchResultsContainer
  }
}
