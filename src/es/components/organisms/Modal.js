// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

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

  constructor (...args) {
    super({ mode: 'open' }, ...args)

    this.clone = null
    this.appendChildListener = event => {
      event.stopImmediatePropagation()
      let child
      if (!this.clone && (child = event.detail.child) && child instanceof HTMLElement) {
        this.section.innerHTML = ''
        // clone node to have a placeholder keeping the space a picture would occupy
        child.replaceWith(this.clone = child.cloneNode())
        this.section.appendChild(child)
      }
      if (this.closeBtn) this.section.appendChild(this.closeBtn)
      this.setAttribute('open', '')
    }
    this.clickListener = event => {
      this.removeAttribute('open')
      if (this.closeBtn) this.appendChild(this.closeBtn)
      let child
      if (this.clone && (child = this.section.childNodes[0])) {
        this.clone.replaceWith(child)
        this.clone = null
      }
    }
  }
  
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML();
    (this.getAttribute('listen-at') ? document.querySelector(this.getAttribute('listen-at')) : document.body).addEventListener(this.getAttribute('append-child') || 'append-child', this.appendChildListener);
    (this.closeBtn ? this.closeBtn : this).addEventListener('click', this.clickListener)
  }
  
  disconnectedCallback () {
    (this.getAttribute('listen-at') ? document.querySelector(this.getAttribute('listen-at')) : document.body).removeEventListener(this.getAttribute('append-child') || 'append-child', this.appendChildListener);
    (this.closeBtn ? this.closeBtn : this).removeEventListener('click', this.clickListener)
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
    return !this.section
  }

  /**
   * renders the o-modal css
   *
   * @return {void}
   */
  renderCSS () {
    // TODO: animation, align content, flex-direction,... , docs
    this.css = /* css */`
      :host > section {
        display: none;
      }
      :host([open]) > section {
        background-color: var(--background-color, rgba(0, 0, 0, 0.8));
        box-sizing: border-box;
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
    this.section = document.createElement('section')
    Array.from(this.root.children).forEach(node => {
      if (node.id === 'close') {
        // move close btn outside of shadow
        this.appendChild(this.closeBtn = node)
        return false
      }
      if (node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.section.appendChild(node)
    })
    this.html = this.section
  }
}
