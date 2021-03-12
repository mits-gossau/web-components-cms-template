// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Example at: /src/es/components/pages/Home.html
 *
 * @export
 * @class Slider
 * @type {CustomElementConstructor}
 */
export default class Slider extends Shadow() {
  constructor (...args) {
    super(...args)

    this.section = document.createElement('section')
    Array.from(this.root.children).forEach(node => {
      if (!node.getAttribute('slot') && node.tagName !== 'STYLE') {
        node.setAttribute('loading', 'eager') // must be eager, not that it loads once visible
        this.section.appendChild(node)
      }
    })

    // TODO: for debugging, remove the line below when done
    self.slider = this
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    setInterval(() => {
      this.next()
    }, 5000);
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
    return !this.root.querySelector('section')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host > section {
        display: flex;
        overflow: var(--overflow, hidden);
        overflow-behavior: var(--overflow-behavior, contain);
        overflow-scrolling: var(--overflow-scrolling, touch);
        -webkit-overflow-scrolling: var(---webkit-overflow-scrolling, touch);
        overscroll-behavior-x: var(--overscroll-behavior-x, none);
        scroll-behavior: var(--scroll-behavior, smooth);
        -ms-scroll-chaining: var(---ms-scroll-chaining, none);
        scroll-snap-type: var(--scroll-snap-type, x proximity);
      /* https://dev.to/dailydevtips1/css-hide-scrollbars-2na0 */
        -ms-overflow-style: var(---ms-overflow-style, none);
        scrollbar-width: var(--scrollbar-width, none);
      }
      .host > section::-webkit-scrollbar {
        display: none;
      }
      /* / https://dev.to/dailydevtips1/css-hide-scrollbars-2na0 */
      :host > section > * {
        --img-height: var(--height);
        --img-width: var(--width);
        --img-object-fit: var(--object-fit, contain);
        align-items: var(--align-items, center);
        display: var(--display, flex);
        justify-content: var(--justify-content, center);
        height: var(--height);
        scroll-snap-align: var(--scroll-snap-align, center);
        min-width: var(--min-width, 100%);
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.html = this.section
  }

  next() {
    let boundingClientRect = null
    if (Array.from(this.section.children).find(child => (boundingClientRect = child.getBoundingClientRect()) && boundingClientRect.x > boundingClientRect.width) && boundingClientRect) {
      this.section.scrollLeft += boundingClientRect.x
    } else {
      this.section.scrollLeft = 0
    }
  }

}