// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/**
 * CheckboxWrapper is a wrapper for checkboxes which must be limited
 * Example at: /src/es/components/molecules/CheckboxWrapper.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class CheckboxWrapper
 * @type {CustomElementConstructor}
 * @attribute {
 *  {number} [max] maximum checked checkboxes
 *  {number} [min] minimum checked checkboxes
 * }
 */
export default class CheckboxWrapper extends Shadow() {
  constructor (...args) {
    super({ mode: 'false' }, ...args) // disabling shadow-DOM to keep default form submit working

    this.changeEventListener = event => {
      if (this.hasAttribute('min')) this.setAttribute('valid', this.checkedCount >= Number(this.getAttribute('min')) ? 'true' : 'false')
      if (this.checkedCount >= Number(this.getAttribute('max'))) {
        this.disableAllUnchecked()
      } else {
        this.enableAll()
      }
    }
  }

  connectedCallback () {
    this.addEventListener('change', this.changeEventListener)
    this.changeEventListener()
  }

  disconnectedCallback () {
    this.removeEventListener('change', this.changeEventListener)
  }

  enableAll () {
    this.checkboxes.forEach(checkbox => checkbox.disabled = false)
  }

  disableAllUnchecked () {
    this.checkboxes.forEach(checkbox => {
      if (!checkbox.checked) checkbox.disabled = true
    })
  }

  get checkedCount () {
    return this.checkboxes.reduce((acc, curr) => curr.checked ? acc + 1 : acc, 0)
  }

  get checkboxes () {
    return Array.from(this.querySelectorAll('input[type=checkbox]'))
  }
}
