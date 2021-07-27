// @ts-check
import Footer from '../web-components-cms-template/src/es/components/organisms/Footer.js'

/* global self */
/* global Link */
/* global customElements */

/**
 * MIndustry Footer
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [logo-load="logo-load"]
 *  {boolean} [homepage] for classics homepage styles (only one logo at right side)
 * }
 * @css {
 *  NOTE: grid-area: footer;
 *  --background-color [black]
 *  --z-index [100]
 *  --content-spacing [40px]
 *  --a-link-content-spacing [0]
 *  --a-link-font-size [1rem]
 *  --a-link-font-size-2 [1rem]
 *  --list-style [none]
 *  --align-items [start]
 *  --font-size [1rem]
 *  --p-margin [0]
 * }
 */
export default class MIndustryFooter extends Footer {
  constructor (...args) {
    super(...args)
  }

  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
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
   * renders the mindustry-o-footer css
   *
   * @return {void}
   */
 renderCSS () {
   super.renderCSS()
    this.css = /* css */`
      :host .footer-mobile {
        display: none;
      }
      :host .footer-links, :host .footer-bottom {
        display: block;
      }
      :host footer {
        display: flex;
        flex-direction: column;
        padding-top: 50px;
      }
      :host h3 {
        margin: 0;
        padding-bottom: 15px;
        line-height: 28px;
        letter-spacing: 0.5px;
      }
      :host ul {
        margin: 0;
      }
      :host ul li {
        padding-bottom: 15px;
      }
      :host .footer-links {
        width: var(--width, 100%);
        margin: var(--margin, 0) auto;
      }
      :host .footer-links > ul {
        width: 100%;
        display: flex;
        justify-content: flex-start;
      }
      :host .footer-links > ul > li {
        padding: 0 15px;
        width: 25%;
        line-height: 20px;
      }
      :host .footer-bottom {
        background-color: var(--bottom-background-color, --background-color);
        margin-top: var(--bottom-spacer-height, 130px);
      }
      :host .footer-bottom > div {
        display: flex;
        justify-content: space-between;
        padding: 15px 15px 20px 15px;
        width: var(--width, 100%);
        margin: var(--margin, 0) auto;
      }
      :host .logo-container {
        height: var(--logo-height, unset);
      }
      :host .footer-bottom ul li {
        padding: 0;
      }
      :host .footer-bottom ul li a-link {
        --font-size: 12px;
        --line-height: 60px;
        --letter-spacing: normal;
        padding-right: 5px;
      }
      :host .footer-bottom ul li span { 
        font-size: 12px;
        line-height: 60px;
        padding-right: 5px;
      }
      :host .footer-bottom ul li:last-of-type span {
        margin-left: 30px;
      }

      @media only screen and (max-width: 992px) {
        :host h3 {
          line-height: 20px;
        }
        :host .footer-links {
          width: var(--width-mobile, 100%);
        }
        :host .footer-bottom > div {
          width: var(--width-mobile, 100%);
        }

      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host footer { 
          padding: var(--padding-mobile, 0 0 40px 0);
        }
        :host .footer-mobile {
          display: block;
        }
        :host .footer-mobile ul li span {
          font-size: var(--span-font-size-mobile, 15px);
          font-weight: var(--span-font-weight, 300);
          line-height: var(--span-line-height-mobile, 30px);
          padding: var(--span-padding-mobile, 20px 0 0 0);
        }
        :host .footer-mobile ul li a-link {
          --font-size: 12px;
        }
        :host .footer-links, :host .footer-bottom {
          display: none;
        }

      }

    `;

 }

 /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    super.renderHTML()
  }

}