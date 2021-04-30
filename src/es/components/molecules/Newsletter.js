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
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    //this.renderHTML()
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
      
      :host a-text-field {
        --text-transform: var(--a-text-field-text-transform, uppercase);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        
      }
    `
  }

  /**
  * renders the a-text-field html
  *
  * @return {void}
  */
  renderHTML() {
    this.loadChildComponents().then(children =>{
      Array.from(this.root.querySelectorAll('input')).forEach(input => {
        const label = this.root.querySelector(`label[for=${input.getAttribute("name")}]`);
        console.log(label, `label[for=${input.getAttribute("name")}]`)
        const aInput = new children[0][1](input, label, { namespace: this.getAttribute('namespace') || ''})
        console.log(aInput, input.getAttribute('type'), this.getAttribute('namespace'))
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
    let textFieldPromise
    try {
      textFieldPromise = Promise.resolve({ default: Input })
    } catch (error) {
      textFieldPromise = import('../atoms/Input.js')
    }
    let buttonPromise
    try {
      buttonPromise = Promise.resolve({ default: Button })
    } catch (error) {
      buttonPromise = import('../atoms/Button.js')
    }
    return (this.childComponentsPromise = Promise.all([
      textFieldPromise.then(
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
}
