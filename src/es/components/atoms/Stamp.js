// @ts-check
import { Intersection } from '../prototypes/Intersection.js'

/* global self */

/**
 * Stamp fly down from above
 * Example at: /src/es/components/molecules/NavigationClassics.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Stamp
 * @type {CustomElementConstructor}
 * @css {
 *  --align-items, center
 *  --display, flex
 *  --flex-direction, column
 *  --justify-content, center
 *  --position, absolute
 *  --text-align, center
 *  --rotate, rotate(-15deg)) scale(1
 *  --transition, opacity 0.2s ease
 *  --animation, 0.5s ease
 *  --rotate, rotate(-15deg)) scale(1
 *  --content-width-mobile, var(--content-width, 100%)
 * }
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
        align-items: var(--align-items, center);
        display: var(--display, flex);
        flex-direction: var(--flex-direction, column);
        justify-content: var(--justify-content, center);
        opacity: 0;
        position: var(--position, absolute);
        text-align: var(--text-align, center);
        transform: var(--rotate, rotate(-15deg)) scale(1);
        transition: var(--transition, opacity 0.2s ease);
        width: 90% !important;
        left: 0;
        margin: 0 5% !important;
        z-index: -1;
      }
      :host([show]) {
        animation: pulse var(--animation, 0.5s ease);
        opacity: 1;
        z-index: var(--z-index, 99);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          width: var(--content-width-mobile, var(--content-width, 100%));
        }
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
