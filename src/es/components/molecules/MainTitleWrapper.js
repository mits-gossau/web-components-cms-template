// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Playlist is the wrapper for molecules/Playlist.js Elements
 * Example at: /src/es/components/pages/ClassicsHighlights.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class MainTitleWrapper
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [custom-margin-top] 
 *  {string} [custom-mobile-margin-top] 
 * }
 */
export default class MainTitleWrapper extends Shadow() {
  constructor(...args) {
    super(...args)
    this.desktopMainTitleSize = this.getAttribute('main-desktop-title-size-rem') ? this.getAttribute('main-desktop-title-size-rem') + "rem" : "4rem"
    this.mobileMainTitleSize = this.getAttribute('main-mobile-title-size-rem') ? this.getAttribute('main-mobile-title-size-rem') + "rem" : "4rem"
    this.resizeImg = this.parentElement.querySelector('a-picture').root.querySelector('picture > img')
    this.customMarginTop = this.getAttribute('custom-margin-top-px') ? this.getAttribute('custom-margin-top-px') : 0
    this.customMobileMarginTop = this.getAttribute('custom-mobile-margin-top-px') ? this.getAttribute('custom-mobile-margin-top-px') : this.customMarginTop
    this.mobileBreakPoint = this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'
    this.mobileBreakPoint = +this.mobileBreakPoint.slice(0, -2);
    this.mobileOffset = 0
    this.desktopOffset = 0


    const resizeObserver = new ResizeObserver((entries) => {
      const img = entries[0]
      const imgHeight = img.contentRect.height
      // if is mobile
      if (window.innerWidth <= this.mobileBreakPoint) {
        this.style.marginTop = 0
        if (this.mobileOffset === 0) this.mobileOffset = +this.offsetTop
        this.mainTitleWrapperMarginTop = Math.ceil(+imgHeight - this.mobileOffset + +this.customMobileMarginTop) + "px"
      } else {
        // if desktop
        this.style.marginTop = 0
        if (this.desktopOffset === 0) this.desktopOffset = +this.offsetTop
        this.mainTitleWrapperMarginTop = Math.ceil(+imgHeight - this.desktopOffset + +this.customMarginTop) + "px"
      }
      this.style.marginTop = this.mainTitleWrapperMarginTop
    })

    if (this.resizeImg) resizeObserver.observe(this.resizeImg)

  }
  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * renders the m-Playlist css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */`
      :host {
        --content-width: 90%;
        display: flex;
        flex-direction: column;
        text-align: center;
        width: var(--content-width, 80%);
        margin: auto;
        margin-top: ${this.mainTitleWrapperMarginTop};
      }
      :host > * {
        z-index: 5;
      }
      :host > h1 {
        margin: 0 auto 1rem auto;
        font-family: var(--font-family-extra-bold);
        font-size: ${this.desktopMainTitleSize};
        line-height: 0.85;
      }
      :host > h4 {
        margin: 0 auto 1rem auto;
        font-family: var(--font-family-extra-bold);
        line-height: 1.2;
      }
      :host > a-link {
        margin: auto;
        --gap: 0.5rem;
        --width: max-content;
        --text-align: center;
        --display: flex;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          width: var(--content-width-mobile, var(--content-width, 90%));
        }
        :host > h1 {
          font-size:${this.mobileMainTitleSize};
        }
      }
    `
  }
}
