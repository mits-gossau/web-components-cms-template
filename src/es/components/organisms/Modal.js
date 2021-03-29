// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */
/* global Link */
/* global customElements */

/**
 * Modal is sticky and hosts uls
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Modal
 * @type {CustomElementConstructor}
 * @css {

 * }
 */
export default class Modal extends Shadow() {
  static get observedAttributes () {
    return ['open']
  }
  
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }
  
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'open') document.body.classList[this.hasAttribute('open') ? 'add' : 'remove'](this.getAttribute('no-scroll') || 'no-scroll')
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.modal
  }

  /**
   * renders the o-modal css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host > section {
        display: none;
      }
      :host([open]) > section {
        background-color: var(--background-color, rgba(0, 0, 0, 0.8));
        display: var(--display, block);
        height: var(--height, 100%);
        padding: var(--padding, min(50px, 4vw));
        position: var(--position, fixed);
        top: var(--top, 0);
        width: var(--width, 100%);
        z-index: var(--z-index, 9999);
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    this.modal = document.createElement('section')
    Array.from(this.root.children).forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.modal.appendChild(node)
    })
    this.html = this.modal
  }
}
