// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global CustomEvent */
/* global self */

/**
 *
 *
 * @export
 * @class SliderButton
 * @type {CustomElementConstructor}
 * @css {
 *
 * }
 * @attribute {
 * }
 */
export default class SliderButton extends Shadow() {
  constructor (...args) {
    super(...args)
    this.hasRendered = false

    this.carouselChanged = event => {
      const index = Number(event.detail.slide) + 1
      const value = index * 100 - 50

      const href = new URL(window.location.href)
      href.searchParams.set('slide', event.detail.slide)
      window.history.pushState(null, window.location.hostname, href)

      this.milestoneMobile.innerHTML = 
        this.milestones[Number(event.detail.slide)]
        .getAttribute('data-slider-target')
      this.carouselChange(value, this.slider)
    }

    this.sliderChange = e => {
      Array.from(this.milestones).forEach(m => {
        let index = Number(m.getAttribute('data-index')) + 1
        const value = Number(e.target.value)
        index = index * 100 - 50
        if (value <= index + 50 && value >= index - 50) {
          m.click()
        }
      })
    }

    this.carouselChange = (value, slider) => {
      if (Number(slider.value) < value) {
        slider.value = (Number(slider.value) + 1).toString()
        setTimeout(this.carouselChange, 2, value, slider)
      } else if (Number(slider.value) > value) {
        slider.value = (Number(slider.value) - 1).toString()
        setTimeout(this.carouselChange, 2, value, slider)
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    document.body.addEventListener('macro-carousel-selected-changed', this.carouselChanged)
    this.slider.addEventListener('mouseup', this.sliderChange)
    this.slider.addEventListener('touchend', this.sliderChange)
  }

  disconnectedCallback () {
    document.body.removeEventListener('macro-carousel-selected-changed', this.carouselChanged)
    this.slider.removeEventListener('mouseup', this.sliderChange)
    this.slider.removeEventListener('touchend', this.sliderChange)
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
      :host {
        position: relative;
        display: flex;
        justify-content: center;
      }

      :host .tab-slider {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 200px;
        bottom: -30px;
        top: 360px;
        z-index: 2;
        width: var(--slider-width);
        max-width: var(--slider-max-width);
      }

      :host .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
      }


      :host .progress-bar{
        position: relative;
        width: 100%;
        height: 40px;
      }

      :host .progress-slider{
        position: absolute;
        top: 50%;
        width: 100%;
        height: 6px;
        margin-top: -3px;
        background: #FFFFFF;
        border-radius: 2px;
        box-shadow: inset 0 1px 0 0 rgb(0 0 0 / 30%);
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
      }

      :host .progress-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 40px;
        height: 40px;
        background: #D1033B;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 2px 2px #b90234;
        cursor: grab;
        z-index: 4;
      }
      
      :host .progress-slider::-moz-range-thumb {
        width: 40px;
        height: 40px;
        background: #D1033B;
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 2px 2px #b90234;
        cursor: grab;
        z-index: 3;
      }

      :host .active-indicator{
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 0;
        width: 40px;
        height: 40px;
        margin-top: -20px;
        background-color: #D1033B;
        border-radius: 50%;
        box-shadow: 0 2px 2px #b90234;
        cursor: grab;
      }

      :host .progress-bar:not(.is-dragging) .active-indicator {
        transition: left .4s cubic-bezier(.93,0,.16,1.02);
      }

      :host .milestones{
        position: relative;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
      }
      :host .milestone-wrapper{
        position: relative;
        z-index: 1;
        width: 185px;
        padding-top: 10px;
        cursor: pointer;
        text-align: center;
      }

      :host .milestone-progress-bar{
        width: 216px;
      }

      :host .milestone{
        position: absolute;
        top: -20px;
        left: 50%;
        display: -ms-flexbox;
        display: flex;
        width: 40px;
        height: 40px;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin-top: -20px;
        margin-left: -20px;
        cursor: pointer;
      }

      :host .milestone-mobile{
        position: absolute;
        left: auto;
        right: auto;
        top: 10px;
        display: none;
      }


      :host .milestone::before {
        display: block;
        width: 6px;
        height: 20px;
        background: #D1033B;
        border-radius: 2px;
        content: '';
        position: absolute;
      }

      @media screen and (max-width: 991px){
        :host .milestone-mobile{
          display: block;
        }
        :host .milestone-headline{
          display: none;
        }
        :host .milestone-wrapper{
          width: 100%;
        }

      }
      
      @media screen and (min-width: 992px) and (max-width: 1199px){
        :host .tab-slider {
          top: 315px;
        }
      }

      @media screen and (min-width: 768px) and (max-width: 991px){
        :host .tab-slider {
          top: 306px;
        }
      }

      @media screen and (min-width: 480px) and (max-width: 767px){
        :host .tab-slider {
          top: 213px;
        }
      }

      @media screen and (max-width: 479px){
        :host .tab-slider {
          top: 135px;
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

    let slide
    const paramString = window.location.search.split('?')[1]
    const queryString = new URLSearchParams(paramString)
    if (queryString.has('slide')) { slide = queryString.get('slide') }

    this.sliderDiv.classList.add('progress-bar')

    this.slider.type = 'range'
    this.slider.min = '1'
    this.slider.max = (this.milestones.length * 100).toString()
    this.slider.classList.add('progress-slider')
    this.sliderDiv.appendChild(this.slider)
    this.tabSlider.appendChild(this.sliderDiv)

    this.milestoneWrapper.classList.add('milestones')

    Array.from(this.milestones).forEach(milestoneDiv => {
      const m = milestoneDiv.querySelector('.milestone')
      const index = m.getAttribute('data-index')
      const data = m.innerHTML

      milestoneDiv.setAttribute('data-slider-target', data)
      milestoneDiv.setAttribute('data-index', index)
      milestoneDiv.setAttribute('role', 'button')

      const milestone = document.createElement('p')
      milestone.classList.add('milestone')
      milestone.setAttribute('data-index', index)
      const milestoneBar = document.createElement('span')
      milestoneBar.classList.add('milestone-progress-bar')
      milestoneBar.setAttribute('data-index', index)
      m.classList.add('sr-only')
      milestone.appendChild(milestoneBar)
      milestone.appendChild(m)

      milestoneDiv.appendChild(milestone)

      const milestoneHead = document.createElement('p')
      milestoneHead.classList.add('milestone-headline')
      milestoneHead.setAttribute('data-index', index)
      milestoneHead.innerHTML = data
      milestoneDiv.appendChild(milestoneHead)

      this.milestoneWrapper.appendChild(milestoneDiv)

      if (index === slide) {
        setTimeout(() => milestoneDiv.click(), 1000)
      }
    })

    this.milestoneMobile.classList.add('milestone-mobile')
    this.milestoneWrapper.appendChild(this.milestoneMobile)

    this.tabSlider.appendChild(this.milestoneWrapper)
  }

  get milestones () {
    return this.tabSlider.querySelectorAll('.milestone-wrapper')
  }

  get tabSlider () {
    return this.root.querySelector('.tab-slider')
  }

  get slider () {
    return this._slider || (this._slider = document.createElement('input'))
  }

  get sliderDiv () {
    return this._sliderDiv || (this._sliderDiv = document.createElement('div'))
  }
    get milestoneWrapper () {
    return this._milestoneWrapper || (this._milestoneWrapper = document.createElement('div'))
  }

  get milestoneMobile () {
    return this._milestoneMobile || (this._milestoneMobile = document.createElement('p'))
  }
}
