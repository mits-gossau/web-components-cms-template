// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */
/* global self */

/**
 * Modal is sticky and hosts uls
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Modal
 * @type {CustomElementConstructor}
 * @event.detail {
 *  {HTMLElement | undefined} child
 *  {boolean} [showOriginal=false] shall the original HTMLElement be shown in the modal. Use this for forms and other stuff which will be updated when open and closed.
 * }
 * @attribute {
 *  {boolean} [open=undefined]
 *  {number} [transition=500] transition time in ms
 *  {querySelector string} [listen-at=body]
 *  {string} [open-modal=open-modal] event name to which to listen to
 *  {string} [no-scroll=no-scroll] class to be set on body when modal is open
 * }
 * @css {
 * --background-color, rgba(0, 0, 0, 0.8)
 * --height, 100%
 * --padding, min(50px, 4vw)
 * --position, fixed
 * --top, 0
 * --width, 100%
 * --z-index, 9999
 * --align-items, start
 * --display, flex
 * --flex-direction, row
 * --justify-content, center
 * --close-margin, 0 10px
 * --padding-mobile, min(50px, 4vw)
 * --align-items-mobile, start
 * --flex-direction-mobile, row
 * --justify-content-mobile, center
 * }
 */
export default class Modal extends Shadow() {
  static get observedAttributes () {
    return ['open']
  }

  constructor (...args) {
    super({ mode: 'open' }, ...args)

    this.open = false
    this.clone = null
    // open
    this.openModalListener = event => {
      if (!this.open) {
        this.open = true
        if (event && typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation()
        let child
        if (!this.clone && event && event.detail && (child = event.detail.child) && child instanceof HTMLElement) {
          if (event.detail.showOriginal === true) {
            // clone node to have a placeholder keeping the space a picture would occupy
            child.replaceWith(this.clone = child.cloneNode())
            this.container.appendChild(child)
          } else {
            this.clone = child.cloneNode()
            this.container.appendChild(this.clone)
          }
        } else {
          this.container.appendChild(this.initialContent)
        }
        if (this.closeBtn) this.container.appendChild(this.closeBtn)
        if (!this.hasAttribute('open')) this.setAttribute('open', '')
      }
    }
    // close
    this.closeModalListener = event => {
      if (this.open) {
        this.open = false
        this.section.animate({ opacity: '0' }, { duration: Number(this.getAttribute('transition')) }).onfinish = () => {
          // move closeBtn back outside shadowDom
          if (this.closeBtn) this.appendChild(this.closeBtn)
          if (this.hasAttribute('open')) this.removeAttribute('open')
          let child
          // if showOriginal this will be triggered by this.clone !== child to move the original back to its origin
          if (this.clone && (child = this.container.childNodes[0]) && this.clone !== child) this.clone.replaceWith(child)
          this.clone = null
          this.container.innerHTML = ''
        }
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML();
    (this.getAttribute('listen-at') ? document.querySelector(this.getAttribute('listen-at')) : document.body).addEventListener(this.getAttribute('open-modal') || 'open-modal', this.openModalListener);
    (this.closeBtn ? this.closeBtn : this).addEventListener('click', this.closeModalListener)
  }

  disconnectedCallback () {
    (this.getAttribute('listen-at') ? document.querySelector(this.getAttribute('listen-at')) : document.body).removeEventListener(this.getAttribute('open-modal') || 'open-modal', this.openModalListener);
    (this.closeBtn ? this.closeBtn : this).removeEventListener('click', this.closeModalListener)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'open') {
      if (this.hasAttribute('open')) {
        document.body.classList.add(this.getAttribute('no-scroll') || 'no-scroll')
        this.openModalListener()
      } else {
        document.body.classList.remove(this.getAttribute('no-scroll') || 'no-scroll')
        this.closeModalListener()
      }
    }
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
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
    this.css = /* css */`
      :host > section {
        height: 0;
        opacity: 0;
        width: 0;
      }
      :host([open]) > section {
        align-items: center;
        background-color: var(--background-color, rgba(0, 0, 0, 0.8));
        box-sizing: border-box;
        display: flex;
        height: var(--height, 100%);
        justify-content: center;
        opacity: 1;
        padding: var(--padding, min(50px, 4vw));
        position: var(--position, fixed);
        top: var(--top, 0);
        transition: opacity ${this.getAttribute('transition') ? `${Number(this.getAttribute('transition')) / 1000}s` : '0.2s'};
        width: var(--width, 100%);
        z-index: var(--z-index, 9999);
      }
      :host([open]) > section > div {
        align-items: var(--align-items, start);
        display: var(--display, flex);
        flex-direction: var(--flex-direction, row);
        justify-content: var(--justify-content, center);
      }
      :host([open]) > section > div > #close {
        margin: var(--close-margin, 0 10px);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host([open]) > section {
          padding: var(--padding-mobile, min(50px, 4vw));
        }
        :host([open]) > section > div {
          align-items: var(--align-items-mobile, start);
          flex-direction: var(--flex-direction-mobile, row);
          justify-content: var(--justify-content-mobile, center);
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    this.initialContent = document.createElement('div')
    Array.from(this.root.children).forEach(node => {
      if (node.id === 'close') {
        // move close btn outside of shadow
        this.appendChild(this.closeBtn = node)
        return false
      }
      if (node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.initialContent.appendChild(node)
    })
    this.section = document.createElement('section')
    this.section.appendChild(this.container = document.createElement('div'))
    this.html = this.section
  }
}
