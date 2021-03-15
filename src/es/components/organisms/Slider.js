// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Dependencies: https://github.com/ciampo/macro-carousel
 * Example at: /src/es/components/organisms/Slider.html
 *
 * @export
 * @class Slider
 * @type {CustomElementConstructor}
 */
export default class Slider extends Shadow() {
  constructor (...args) {
    super(...args)

    this.macroCarousel = document.createElement('macro-carousel')
    Array.from(this.attributes).forEach(attribute => {
      if (attribute.name) this.macroCarousel.setAttribute(attribute.name, attribute.key || 'true')
    })
    Array.from(this.root.children).forEach(node => {
      if (!node.getAttribute('slot') && node.tagName !== 'STYLE') {
        node.setAttribute('loading', 'eager') // must be eager, not that it loads once visible
        this.macroCarousel.appendChild(node)
      }
    })
    this.interval = null
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
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
    return !this.scripts.length
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host > macro-carousel {
        --height: auto;
        --width: auto;
        --width-mobile: auto;
      }
      :host > macro-carousel > * {
        --img-height: ${this.getAttribute('height') ? 'min(auto, 100%)' : 'auto'};
        --img-width: ${this.getAttribute('height') ? 'auto' : '100%'};
        --img-max-height: ${this.getAttribute('height') || '100%'};
        --img-min-height: 0px;
        --img-max-width: 100%;
        --img-min-width: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :host > macro-carousel *:focus {
        outline: var(--outline-focus, 0);
      }
    `
    // inject style which can't be controlled through css vars
    // style which must be inside macro-carousel shadowDom
    this.injectStyle = document.createElement('style')
    this.injectStyle.innerHTML = /* css */`
      #pagination {
        position: var(--pagination-position);
        bottom: var(--pagination-bottom);
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.loadDependency().then(() => {
      this.html = this.macroCarousel
      // wait for the carousel component to initiate the shadowDom and be ready
      const interval = setInterval(() => {
        if (this.macroCarousel.shadowRoot) {
          clearInterval(interval)
          this.macroCarouselReady()
        }
      }, 100);
    })
  }

  /**
   * fetch dependency
   *
   * @returns {Promise<{components: any}>}
   */
  loadDependency () {
    return this.dependencyPromise || (this.dependencyPromise = new Promise(resolve => {
      const macroCarouselScript = document.createElement('script')
      macroCarouselScript.setAttribute('type', 'text/javascript')
      macroCarouselScript.setAttribute('async', '')
      //macroCarouselScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/macro-carousel/dist/macro-carousel.min.js')
      macroCarouselScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/macro-carousel@1.0.0/dist/macro-carousel.min.js')
      macroCarouselScript.onload = () => resolve()
      this.html = macroCarouselScript
    }))
  }

  macroCarouselReady () {
    this.macroCarousel.shadowRoot.appendChild(this.injectStyle)
    // autoplay
    if (this.getAttribute('interval')) {
      this.setInterval()
      this.macroCarousel.addEventListener('macro-carousel-selected-changed', event => this.setInterval())
    }
  }

  setInterval () {
    clearInterval(this.interval)
    this.interval = setInterval(() => this.macroCarousel.next(), Number(this.getAttribute('interval')))
  }

  get scripts () {
    return this.root.querySelectorAll('script')
  }
}
