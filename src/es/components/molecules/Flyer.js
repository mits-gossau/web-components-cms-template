// @ts-check
import { Intersection } from '../prototypes/Intersection.js'

/* global HTMLElement */

/**
 * Flyer can hold anything which shall fly into the viewport on intersection
 * Example at: /src/es/components/pages/Home.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Flyer
 * @type {CustomElementConstructor}
 * @css {
 *  --padding [20px]
 *  --text-align [left|right]
 *  --duration [0.7s]
 *  --transform [translateX(var(--translate-x, 0))] if set will overwrite the translateX
 *  --translate-x [0] if transform is set it will be ignored
 *  --z-index [99]
 * }
 * @attribute {
 *  {fixed | undefined} [position=undefined] set to fixed if it is desired for the flyer to follow the scroll for the defined rootMargin
 *  {number} [timer=false] if any number all intersection settings will be ignored and the flyer will appear after the timeout
 *  {string} [href=undefined] used for the link reference
 *  {right, left} [direction=left]
 * }
 */
export default class Flyer extends Intersection() {
  constructor (options = {}, ...args) {
    super(Object.assign(options, {intersectionObserverInit: {rootMargin: '500px 0px 0px 0px', threshold: 1}}), ...args)

    this.div = document.createElement('div')
    Array.from(this.root.children).forEach(node => {
      if (!node.getAttribute('slot')) this.div.appendChild(node)
    })
    this.html = this.div

    this.clickListener = event => {
      if (this.getAttribute('href')) {
        event.preventDefault()
        location.href = this.getAttribute('href')
      }
    }
    this.closeClickListener = event => {
      event.preventDefault()
      event.stopPropagation()
      this.div.classList.remove('visible')
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.getAttribute('timer')) {
      setTimeout(() => {
        this.css = /* css */`
          :host {
            --top: ${this.topMiddle}; 
          }
        `
        this.div.classList.add('visible')
      }, Number(this.getAttribute('timer')));
    } else {
      // only connect intersection callback if no timer is set
      super.connectedCallback()
    }
    this.addEventListener('click', this.clickListener)
    if (this.closeBtn) this.closeBtn.addEventListener('click', this.closeClickListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.removeEventListener('click', this.clickListener)
    if (this.closeBtn) this.closeBtn.removeEventListener('click', this.closeClickListener)
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
   * renders the m-Flyer css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: block;
        box-sizing: border-box;
        left: 0;
        position: absolute;
        width: 100%;
      }
      :host > div {
        ${this.getAttribute('position') === 'fixed' || this.getAttribute('timer') ? 'position: fixed;' : ''}
        top: var(--top, ${this.getAttribute('timer') ? this.topMiddle : 0});
        padding: var(--padding, 20px);
        text-align: var(--text-align, ${this.getAttribute('direction') === 'right' ? 'right' : 'left'});
        transform: ${this.getAttribute('direction') === 'right' ? 'translateX(100vw)' : 'translateX(-100vw)'};
        transition: all var(--duration, 0.7s) ease;
        visibility: hidden;
        z-index: var(--z-index, 99);
      }
      :host > div.visible {
        transform: var(--transform, translateX(var(--translate-x, 0)));
        visibility: visible;
      }
      :host > div > * {
        max-height: 100%;
        max-width: 100%;
      }
      :host #close {
        cursor: pointer;
      }
    `
  }

  intersectionCallback (entries, observer) {
    if (entries && entries[0]) {
      if (entries[0].isIntersecting) {
        if (this.getAttribute('position') === 'fixed') this.css = /* css */`
         :host {
           --top: ${this.topMiddle}; 
         }
        `
        this.div.classList.add('visible')
      } else {
        this.div.classList.remove('visible')
      }
    }
  }

  get topMiddle () {
    return `${(self.outerHeight - this.div.offsetHeight)/2}px`
  }

  get closeBtn () {
    return this.root.querySelector('#close')
  }
}