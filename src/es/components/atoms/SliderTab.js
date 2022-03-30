// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global CustomEvent */
/* global self */

/**
 *
 *
 * @export
 * @class SliderTab
 * @type {CustomElementConstructor}
 * @css {
 *
 * }
 * @attribute {
 * }
 */
export default class SliderTab extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
   * renders the m-Slider-Tab css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: flex;
        justify-content: flex-start !important;
        flex-direction: column;
        align-content: center;
      }

      :host .nav {
        ${this.hasAttribute('nav-img') 
          ? `background-image: url(${this.getAttribute('nav-img')});` 
          : `background-color: ${this.getAttribute('nav-color')};`}
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;        
        padding-bottom: 200px;
        width: 100%;
        display:flex;
        justify-content: center;
      }

      :host .content {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: var(--slider-width);
        margin-bottom: 50px !important;
        margin: 0 16.6666666667%;
        padding: 0 12px;
      }

      @media (min-width: 1200px){
        :host .nav {
          height: 360px;
        }
        :host .nav a-picture {
          --picture-height: 360px;
          --picture-width: 480px;
        }
      }

      @media screen and (min-width: 992px) and (max-width: 1199px){
        :host .nav {
          height: 306px;
        }
        :host .nav a-picture {
          --picture-height: 306px;
          --picture-width: 408px;
        }
        :host .content {
          margin: 0 8.3333333333%;
        }
      }
      @media screen and (min-width: 768px) and (max-width: 991px){
        :host .nav {
          height: 306px;
        }
        :host .nav a-picture {
          --picture-height: 306px;
          --picture-width: 408px;
        }
        :host .content {
          margin: 0 8.3333333333%;
        }
      }

      @media screen and (min-width: 480px) and (max-width: 767px){
        :host .nav {
          height: 213px;
        }
        :host .nav a-picture {
          --picture-height: 213px;
          --picture-width: 284px;
        }
        :host .content {
          padding-right: 8px;
          padding-left: 8px;
        }
      }

      @media screen and (max-width: 479px){
        :host .nav {
          height: 135px;
        }
        :host .nav a-picture {
          --picture-height: 135px;
          --picture-width: 180px;
        }
      }
    `
  }

}
