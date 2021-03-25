// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */
/* global customElements */

/**
 * Dependencies: https://github.com/ciampo/macro-carousel
 * Example at: /src/es/components/organisms/MacroCarousel.html
 *
 * @attribute {
 *  {number + px} height
 *  {number + px} [mobile-breakpoint=1000px]
 *  {number} interval (autoplay is activated if this is set)
 *  ↓↓↓ macro-carousel attributes ↓↓↓
 *  https://github.com/ciampo/macro-carousel/blob/master/docs/macro-carousel.md#properties-all-reflected-to-attributes-in-kebab-case
 *  {number} [selected=0]
 *  {boolean} [loop=false]
 *  {boolean} [navigation=false]
 *  {boolean} [pagination=false]
 *  {number} [slides-per-view=1]
 *  {number} [slides-per-view-mobile=1]
 * }
 * @css {
 *  --content-width [100%]
 *  --margin [0 auto]
 *  --outline-focus [0]
 *  --content-width-mobile [100%]
 *  --margin-mobile [0 auto]
 *  --transition-duration [0.5s]
 *  --pagination-position
 *  --pagination-bottom
 *  --pagination-background-color [black]
 *  --pagination-background-color-selected [pink]
 *  --pagination-width [5px]
 *  --navigation-color [black]
 *  --navigation-color-focus [black]
 *  --navigation-background-color [transparent]
 *  --navigation-background-color-focus [rgba(0, 0, 0, 0.2)]
 *  --navigation-button-size [48px]
 *  --navigation-icon-size [24px]
 *  --navigation-icon-mask [url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E %3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E %3C/svg%3E")]
 * }
 * @type {CustomElementConstructor}
 */
export default class MacroCarousel extends Shadow() {
  constructor (...args) {
    super(...args)

    this.macroCarousel = document.createElement('macro-carousel')
    // copy all kids into the macro-carousel
    Array.from(this.root.children).forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      node.setAttribute('loading', 'eager') // must be eager, not that it loads once visible
      this.macroCarousel.appendChild(node)
    })
    // forward all attributes
    Array.from(this.attributes).forEach(attribute => {
      if (attribute.name) {
        // only grab the slides-per-view-mobile if mobile else without
        if (attribute.name.includes('slides-per-view')) {
          this.macroCarousel.setAttribute('slides-per-view', this.getAttribute(`slides-per-view${this.getMedia()}`) || '1')
        } else {
          this.macroCarousel.setAttribute(attribute.name, attribute.value || 'true')
        }
      }
    })
    this.resizeListener = event => {
      this.macroCarousel.setAttribute('slides-per-view', this.getAttribute(`slides-per-view${this.getMedia()}`) || '1')
    }
    this.interval = null
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    self.addEventListener('resize', this.resizeListener)
  }

  disconnectedCallback () {
    self.removeEventListener('resize', this.resizeListener)
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
        width: var(--content-width, 100%);
        margin: var(--margin, 0 auto);
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
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > macro-carousel {
          width: var(--content-width-mobile, 100%);
          margin: var(--margin-mobile, 0 auto);
        }
      }
    `
    // inject style which can't be controlled through css vars
    // style which must be inside macro-carousel shadowDom
    this.injectStyle = document.createElement('style')
    // get more from here: https://github.com/ciampo/macro-carousel/blob/master/src/macro-carousel/macro-carousel.css
    this.injectStyle.innerHTML = /* css */`
      :host {
        --macro-carousel-transition-duration: var(--transition-duration, 0.5s);
      }
      :host > #pagination {
        position: var(--pagination-position);
        bottom: var(--pagination-bottom);
      }
      :host div ::slotted(macro-carousel-pagination-indicator) {
        --macro-carousel-pagination-color: var(--pagination-background-color, black);
        --macro-carousel-pagination-color-selected: var(--pagination-background-color-selected, pink);
        --macro-carousel-pagination-size-dot: var(--pagination-width, 5px);
      }
      :host div ::slotted(macro-carousel-nav-button) {
        --macro-carousel-navigation-color: var(--navigation-color, black);
        --macro-carousel-navigation-color-focus: var(--navigation-color-focus, black);
        --macro-carousel-navigation-color-background: var(--navigation-background-color, transparent);
        --macro-carousel-navigation-color-background-focus: var(--navigation-background-color-focus, rgba(0, 0, 0, 0.2));
        --macro-carousel-navigation-button-size: var(--navigation-button-size, 48px);
        --macro-carousel-navigation-icon-size: var(--navigation-icon-size, 24px);
        --macro-carousel-navigation-icon-mask: var(--navigation-icon-mask, url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23000'%3E %3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E %3C/svg%3E"));
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
      }, 100)
    })
  }

  /**
   * fetch dependency
   *
   * @returns {Promise<{components: any}>}
   */
  loadDependency () {
    // make it global to self so that other components can know when it has been loaded
    return self.macroCarousel || (self.macroCarousel = new Promise(resolve => {
      if (customElements.get('macro-carousel')) {
        resolve()
      } else {
        const macroCarouselScript = document.createElement('script')
        macroCarouselScript.setAttribute('type', 'text/javascript')
        macroCarouselScript.setAttribute('async', '')
        // macroCarouselScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/macro-carousel/dist/macro-carousel.min.js')
        macroCarouselScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/macro-carousel@1.0.0/dist/macro-carousel.min.js')
        macroCarouselScript.onload = () => resolve()
        this.html = macroCarouselScript
      }
    }))
  }

  macroCarouselReady () {
    // style which has to be injected to take effect
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

  getMedia () {
    // @ts-ignore ignoring self.Environment error
    const breakpoint = this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'
    return self.matchMedia(`(min-width: calc(${breakpoint} + 1px))`).matches ? '' : '-mobile'
  }

  get scripts () {
    return this.root.querySelectorAll('script')
  }
}
