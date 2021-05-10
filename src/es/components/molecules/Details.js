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
 *  --text-align, center
 *  --margin, 0
 *  --padding, 0
 *  --marker-display, none
 *  --marker-content, ""
 *  --summary-cursor, pointer
 *  --summary-text-decoration, underline
 *  --summary-outline, none
 *  --summary-margin, 0
 *  --summary-padding, 0
 *  --summary-text-decoration-open, none
 *  --summary-child-margin, 0
 *  --summary-child-padding, 0
 *  --summary-child-margin-open, 0
 *  --summary-child-padding-open, 0
 *  --child-margin, 0
 *  --child-padding, 0
 *  --animation, 0.1s ease
 *  --child-margin-open, 0
 *  --child-padding-open, 0
 *  --a-color, var(--color)
 *  --close-cursor, pointer
 *  --close-display, block
 *  --close-text-decoration, underline
 *  --close-text-transform, uppercase
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
      if (this.details && event.detail.child) {
        if (event.detail.child === this) {
          this.details.scrollIntoView({ behavior: 'smooth' })
        } else {
          this.details.removeAttribute('open')
        }
      }
    }

    this.clickEventListener = event => {
      if (this.details && event.target && event.target.classList.contains('close')) {
        event.preventDefault()
        this.details.removeAttribute('open')
      }
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
      :host details summary::marker, :host details summary::-webkit-details-marker {
        display: var(--marker-display, none);
        content: var(--marker-content, "");
      }
      :host details summary {
        cursor: var(--summary-cursor, pointer);
        text-decoration: var(--summary-text-decoration, var(--a-text-decoration, var(--text-decoration, none)));
        text-underline-offset: var(--a-text-underline-offset, unset);
        text-transform: var(--summary-text-transform, none);
        outline: var(--summary-outline, none);
        margin: var(--summary-margin, 0);
        padding: var(--summary-padding, 0);
      }
      :host details summary:hover, :host details summary:active, :host details summary:focus {
        text-decoration: var(--summary-text-decoration-hover, var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none)))));
      }
      :host details[open] summary {
        text-decoration: var(--summary-text-decoration-open, none);
      }
      :host details summary > * {
        margin: var(--summary-child-margin, 0);
        padding: var(--summary-child-padding, 0);
      }
      :host details[open] summary > * {
        margin: var(--summary-child-margin-open, 0);
        padding: var(--summary-child-padding-open, 0);
      }
      :host details summary ~ * {
        margin: var(--child-margin, 0);
        padding: var(--child-padding, 0);
      }
      :host details[open] summary ~ * {
        animation: open var(--animation, 0.2s ease);
        margin: var(--child-margin-open, 0);
        padding: var(--child-padding-open, 0);
      }
      :host details .close {
        color: var(--a-color, var(--color));
        cursor: var(--close-cursor, pointer);
        display: var(--close-display, block);
        text-decoration: var(--close-text-decoration, var(--a-text-decoration, var(--text-decoration, none)));
        text-underline-offset: var(--a-text-underline-offset, unset);
        text-transform: var(--close-text-transform, uppercase);
      }
      :host details .close:hover, :host details .close:active, :host details .close:focus {
        text-decoration: var(--close-text-decoration-hover, var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none)))));
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
