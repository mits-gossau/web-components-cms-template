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
 * }
 */
export default class Flyer extends Intersection() {
  constructor (options = {}, ...args) {
    super(Object.assign(options, {intersectionObserverInit: {rootMargin: '0px 0px 0px 0px', threshold: 1}}), ...args)

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
        transform: translateX(-100vw);
        transition: all 0.5s ease;
      }
      :host > *.visible {
        transform: translateX(0);
      }
    `
  }

  intersectionCallback (entries, observer) {
    if (entries && entries[0]) Array.from(this.root.children).forEach(node => node.classList[entries[0].isIntersecting ? 'add' : 'remove']('visible'))
  }
}