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
  * --transform [translateX(var(--translate-x, 0))]
 *  --translate-x [0]
 * }
 * @attribute {
 *  {string} href used for the link reference
 *  {right, left} [direction=left]
 * }
 * 
 * TODO: allow elements to be triggered with a timer and position fixed, that scenario also allows for fly in top and bottom
 * 
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
        display: block;
        box-sizing: border-box;
        left: 0;
        position: absolute;
        width: 100%;
      }
      :host > div {
        padding: var(--padding, 20px);
        text-align: var(--text-align, ${this.getAttribute('direction') === 'right' ? 'right' : 'left'});
        transform: ${this.getAttribute('direction') === 'right' ? 'translateX(100vw)' : 'translateX(-100vw)'};
        transition: all var(--duration, 0.7s) ease;
        visibility: hidden;
      }
      :host > div.visible {
        transform: var(--transform, translateX(var(--translate-x, 0)));
        visibility: visible;
      }
      :host > div > * {
        max-width: 100%;
      }
    `
  }

  intersectionCallback (entries, observer) {
    console.log('changed', entries);
    if (entries && entries[0]) this.div.classList[entries[0].isIntersecting ? 'add' : 'remove']('visible')
  }
}