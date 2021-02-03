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
 *  {fixed | false} [position=fixed] set to fixed if it is desired for the flyer to follow the scroll for the defined rootMargin. NOTE: it is by default fixed... see => this.isPositionFixed
 *  {number} [timer=false] if any number all intersection settings will be ignored and the flyer will appear after the timeout
 *  {string} [href=falsy] used for the link reference
 *  {up, right, down, left} [direction=left] position will always be fixed when "up" or "down"
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
            ${this.varTop};
            ${this.varRight}
            ${this.varBottom};
            ${this.varLeft}
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
    if (!this.getAttribute('timer')) super.disconnectedCallback()
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
        ${this.isPositionFixed ? 'position: fixed;' : ''}
        top: var(--top, unset);
        right: var(--right, unset);
        bottom: var(--bottom, unset);
        left: var(--left, unset);
        padding: var(--padding, 20px);
        text-align: var(--text-align, ${this.getAttribute('direction') === 'right' ? 'right' : 'left'});
        transform: ${this.getAttribute('direction') === 'up' ? 'translateY(-100vh)' : this.getAttribute('direction') === 'right' ? 'translateX(100vw)' : this.getAttribute('direction') === 'down' ? 'translateY(100vh)' : 'translateX(-100vw)'};
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
        if (this.isPositionFixed) this.css = /* css */`
         :host {
           ${this.varTop};
           ${this.varRight}
           ${this.varBottom};
           ${this.varLeft}
         }
        `
        this.div.classList.add('visible')
      } else {
        this.div.classList.remove('visible')
      }
    }
  }

  get topMiddle () {
    return `${(self.innerHeight - this.div.offsetHeight)/2}px`
  }

  get leftMiddle () {
    return `${(self.innerWidth - this.div.offsetWidth)/2}px`
  }

  get varTop () {
    if (this.getAttribute('direction') === 'up') return '--top: 0;'
    return this.getAttribute('direction') === 'left' || this.getAttribute('direction') === 'right' ? `--top: ${this.topMiddle};` : ''
  }

  get varRight () {
    return this.getAttribute('direction') === 'right' ? '--right: 0;' : ''
  }

  get varBottom () {
    return this.getAttribute('direction') === 'down' ? '--bottom: 0;' : ''
  }

  get varLeft () {
    return this.getAttribute('direction') === 'up' || this.getAttribute('direction') === 'down' ? `--left: ${this.leftMiddle};` : ''
  }

  get isPositionFixed () {
    return this.getAttribute('position') === 'fixed' || !this.getAttribute('position') || this.getAttribute('timer') || this.getAttribute('direction') === 'up' || this.getAttribute('direction') === 'down'
  }

  get closeBtn () {
    return this.root.querySelector('#close')
  }
}