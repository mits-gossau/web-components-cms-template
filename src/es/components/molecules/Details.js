// @ts-check
import { Mutation } from '../prototypes/Mutation.js'

/* global location */
/* global self */

/**
 * Details (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) aka. Bootstrap accordion
 * Example at: /src/es/components/molecules/NavigationClassics.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Details
 * @type {CustomElementConstructor}
 * @css {
 *  --**
 * }
 * @attribute {
 *  {boolean} [open=false] opens the details
 *  {string} [openEventName='open'] the event to which it listens on body
 * }
 */
export default class Details extends Mutation() {
  constructor (options = {}, ...args) {
    super(Object.assign(options, { mutationObserverInit: { attributes: true, attributeFilter: ['open'] } }), ...args)

    // overwrite default Mutation observer parent function created at super
    this.mutationObserveStart = () => {
      // @ts-ignore
      if (this.details) this.mutationObserver.observe(this.details, this.mutationObserverInit)
    }

    this.openEventListener = event => {
      if (this.details && event.detail.child && event.detail.child !== this) this.details.removeAttribute('open')
    }
  }

  connectedCallback () {
    super.connectedCallback()
    document.body.addEventListener(this.openEventName, this.openEventListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    document.body.removeEventListener(this.openEventName, this.openEventListener)
  }

  mutationCallback (mutationList, observer) {
    mutationList.forEach(mutation => {
      if (mutation.target.hasAttribute('open')) this.dispatchEvent(new CustomEvent(this.openEventName, {
        detail: {
          child: this
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    })
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
   * renders the m-Details css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        
      }
    `
  }

  get openEventName () {
    return this.getAttribute('openEventName') || 'open'
  }

  get details () {
    return this.root.querySelector('details')
  }
}
