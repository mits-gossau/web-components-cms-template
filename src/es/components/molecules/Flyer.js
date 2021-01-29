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
 * @attribute {
 *  {string} href used for the link reference
 *  {up, right, down, left} [direction=left] TODO: up, down overflow issue
 * }
 */
export default class Flyer extends Intersection() {
  constructor (options = {}, ...args) {
    super(Object.assign(options, {intersectionObserverInit: {rootMargin: '500px 0px 0px 0px', threshold: 1}}), ...args)

    this.clickListener = event => {
      if (this.getAttribute('href')) location.href = this.getAttribute('href')
    }
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.removeEventListener('click', this.clickListener)
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
        cursor: pointer;
        display: block;
        position: absolute;
      }
      :host > * {
        transform: ${this.getAttribute('direction') === 'up' ? 'translateY(100vh)' : this.getAttribute('direction') === 'right' ? 'translateX(100vw)' : this.getAttribute('direction') === 'down' ? 'translateY(100vh)' : 'translateX(-100vw)'};
        transition: all 0.5s ease;
      }
      :host > *.visible {
        transform: translateY(0);
        transform: translateX(0);
      }
    `
  }

  intersectionCallback (entries, observer) {
    if (entries && entries[0]) Array.from(this.root.children).forEach(node => node.classList[entries[0].isIntersecting ? 'add' : 'remove']('visible'))
  }
}