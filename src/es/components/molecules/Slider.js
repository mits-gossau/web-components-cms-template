// @ts-check
import Body from '../organisms/Body.js'

/* global CustomEvent */
/* global self */

/**
 *
 *
 * @export
 * @class Slider
 * @type {CustomElementConstructor}
 * @css {
 *
 * }
 * @attribute {
 * }
 */
export default class Slider extends Body {
  constructor (...args) {
    super(...args)
    this.hasRendered = false

    this.buttonClickListener = e => {
      const index = e.target.getAttribute('data-index')
      const carousel = Array.from(this.slider.shadowRoot.children)
        .filter(n => n.nodeName === 'MACRO-CAROUSEL')[0]
      const paginations = Array.from(carousel.children)
        .filter(n => n.nodeName === 'MACRO-CAROUSEL-PAGINATION-INDICATOR')

      paginations[index].click()
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }

  disconnectedCallback () {

  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.hasRendered
  }

  /**
   * renders the m-Slider-Tab css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`

      :host > third-party-macro-carousel {
        position: relative; 
        --pagination-display: none !important;
        --content-width: 100%;
      }
      @media (max-width: 479px){
        :host > third-party-macro-carousel {
          --slider-width: 95%;
        }
      }

      @media (min-width: 480px) and (max-width: 767px){
        :host > third-party-macro-carousel {
          --slider-width: 90%;
          --slider-max-width: 748px;
        }
      }
      
      @media (min-width: 768px)  and (max-width: 991px){
        :host > third-party-macro-carousel {
          --slider-width: 648px;
        }
      }

      @media (min-width: 992px)  and (max-width: 1199px){
        :host > third-party-macro-carousel {
          --slider-width: 888px;
        }
      }
      
      @media (min-width: 1200px){
        :host > third-party-macro-carousel {
          --slider-width: 1008px;
        }
      }
    
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.hasRendered = true

    this.sliderButton.appendChild(this.tabSlider)
    this.html = this.sliderButton

    this.slider.setAttribute('pagination', '')

    Array.from(this.milestones).forEach(m => {
      const milestoneDiv = document.createElement('div')
      milestoneDiv.classList.add('milestone-wrapper')
      milestoneDiv.appendChild(m)
      milestoneDiv.addEventListener('click', this.buttonClickListener)
      this.tabSlider.appendChild(milestoneDiv)
    })

    Array.from(this.root.children).forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE')
        return false
      this.slider.appendChild(node)
    })

    this.html = this.slider

    this.loadChildComponents()
  }

  /**
   * fetch children when first needed
   *
   * @param {Promise<[string, CustomElementConstructor]>[]} [promises=[]]
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents (promises = []) {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let sliderButton, sliderTab, carousel
    try {
      sliderButton = Promise.resolve({ default: SliderButton })
    } catch (error) {
      sliderButton = import('../atoms/SliderButton.js')
    }
    try {
      carousel = Promise.resolve({ default: MacroCarousel })
    } catch (error) {
      carousel = import('../thirdParty/MacroCarousel.js')
    }
    return (this.childComponentsPromise = Promise.all([
      sliderButton.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-slider-button', module.default]
      ),
      carousel.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['third-party-macro-carousel', module.default]
      ),
      ...promises
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }

  get milestones () {
    return this.tabSlider.querySelectorAll('.milestone')
  }

  get tabSlider () {
    return this.root.querySelector('.tab-slider')
  }

  get slider () {
    return this._slider || (this._slider = document.createElement('third-party-macro-carousel'))
  }

  get sliderButton () {
    return this._sliderButton || (this._sliderButton = document.createElement('a-slider-button'))
  }
}
