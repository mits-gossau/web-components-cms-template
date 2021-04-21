// @ts-check
import { Intersection } from '../prototypes/Intersection.js'

/* global self */
/* global CustomEvent */

/**
 * Stamp fly down from above
 * Example at: /src/es/components/molecules/NavigationClassics.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Stamp
 * @type {CustomElementConstructor}
 */
export default class Stamp extends Intersection() {
  constructor (options = {}, ...args) {
    super(Object.assign(options, { mode: 'open', intersectionObserverInit: { rootMargin: '-100px 0px -150px 0px' } }), ...args)

    this.clickEventListener = event => {
      if (event.target && event.target.classList.contains('close')) {
        event.preventDefault()
        this.removeAttribute('show')
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.root.addEventListener('click', this.clickEventListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.root.removeEventListener('click', this.clickEventListener)
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
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: block;
        opacity: 0;
        transition: var(--transition, opacity 0.2s ease);
        transform: var(--rotate, rotate(-15deg)) scale(1);
        text-align: var(--text-align, center);
      }
      :host([show]) {
        animation: pulse var(--animation, 0.5s ease);
        opacity: 1;
      }
      @keyframes pulse{
        0%{
          opacity: 0;
        }
        10%{
          opacity:.50;
          transform-origin: 50% 50%;
          transform: rotate(-2deg) scale(5);
          transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
        }
        100%{
          opacity:1;
          transform: var(--rotate, rotate(-15deg)) scale(1);
        }
      }
    `
  }

  intersectionCallback (entries, observer) {
    if (entries && entries[0]) {
      if (entries[0].isIntersecting) {
        this.setAttribute('show', true)
      } else {
        this.removeAttribute('show')
      }
    }
  }
}
