// @ts-check
import { Mutation } from '../prototypes/Mutation.js'

/* global CustomEvent */

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

    this.clickEventListener = event => {
      if (this.details && event.target && event.target.classList.contains('close')) this.details.removeAttribute('open')
    }
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    document.body.addEventListener(this.openEventName, this.openEventListener)
    this.root.addEventListener('click', this.clickEventListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    document.body.removeEventListener(this.openEventName, this.openEventListener)
    this.root.removeEventListener('click', this.clickEventListener)
  }

  mutationCallback (mutationList, observer) {
    mutationList.forEach(mutation => {
      if (mutation.target.hasAttribute('open')) {
        this.dispatchEvent(new CustomEvent(this.openEventName, {
          detail: {
            child: this
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
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
      :host details {
        text-align: var(--text-align, center);
        margin: var(--margin, 0);
        padding: var(--padding, 0);
      }
      :host details summary::marker {
        display: var(--marker-display, none);
        content: var(--marker-content, "");
      }
      :host details summary {
        cursor: var(--summary-cursor, pointer);
        text-decoration: var(--summary-text-decoration, underline);
        outline: var(--summary-outline, none);
        margin: var(--summary-margin, 0);
        padding: var(--summary-padding, 0);
      }
      :host details[open] summary {
        text-decoration: var(--summary-text-decoration-open, none);
      }
      :host details summary > * {
        margin: var(--summary-child-margin, revert);
        padding: var(--summary-child-padding, revert);
      }
      :host details[open] summary > * {
        margin: var(--summary-child-margin-open, 0);
        padding: var(--summary-child-padding-open, 0);
      }
      :host details summary ~ * {
        margin: var(--child-margin, revert);
        padding: var(--child-padding, revert);
      }
      :host details[open] summary ~ * {
        animation: open var(--animation, 0.1s ease);
        margin: var(--child-margin-open, 0);
        padding: var(--child-padding-open, 0);
      }
      :host details .close {
        cursor: var(--close-cursor, pointer);
        display: var(--close-display, block);
        text-decoration: var(--close-text-decoration, underline);
        text-transform: var(--close-text-transform, uppercase);
      }
      @keyframes open {
        0% {font-size: 0}
        100% {font-size: inherit}
      }
    `
  }

  get openEventName () {
    return this.getAttribute('open-event-name') || 'open'
  }

  get details () {
    return this.root.querySelector('details')
  }
}
