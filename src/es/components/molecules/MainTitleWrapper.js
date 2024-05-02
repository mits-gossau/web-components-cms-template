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
    this.desktopMainTitleSize = this.getAttribute('main-desktop-title-size-rem') ? this.getAttribute('main-desktop-title-size-rem') : 4
    this.resizeImg = this.parentElement.querySelector('a-picture').root.querySelector('picture > img')
    this.customMarginTop = this.getAttribute('custom-margin-top-px') ? this.getAttribute('custom-margin-top-px') : 0
    this.customMobileMarginTop = this.getAttribute('custom-mobile-margin-top-px') ? this.getAttribute('custom-mobile-margin-top-px') : this.customMarginTop
    this.mobileBreakPoint = this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'
    this.mobileBreakPoint = +this.mobileBreakPoint.slice(0, -2);
    this.mobileOffset = 0
    this.desktopOffset = 0
    this.isAnimationShown = false


    const imgResizeObserver = new ResizeObserver((entries) => {
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

    const h2ResizeObserver = new ResizeObserver((entries) => {
      const wrapper = entries[0]
      const wrapperWidth = wrapper.contentRect.width
      const h2Elem = entries[0].target.root.querySelector('h2')
      const h2ElemFontSize = +h2Elem.style.fontSize.slice(0, -3) === 0 ? this.desktopMainTitleSize : +h2Elem.style.fontSize.slice(0, -3)
      const h2Width = h2Elem.offsetWidth
      let updatedFontSizeRem

      if (h2Width > wrapperWidth) {
        updatedFontSizeRem = h2ElemFontSize / wrapperWidth * (wrapperWidth - 10)

      }
      if (h2Width < wrapperWidth - 10) {
        updatedFontSizeRem = h2ElemFontSize / wrapperWidth * (wrapperWidth + 10)
        if (updatedFontSizeRem > this.desktopMainTitleSize) updatedFontSizeRem = this.desktopMainTitleSize
      }

      h2Elem.style.fontSize = updatedFontSizeRem + 'rem'
    })

    if (this.resizeImg) imgResizeObserver.observe(this.resizeImg)
    h2ResizeObserver.observe(this.parentElement.querySelector('m-main-title-wrapper'))

  }
  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.isAnimationShown = true
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
        --content-width-mobile: 90%;
        --content-width: 60%;
        display: var(--display, flex);
        flex-direction: column;
        text-align: center;
        width: var(--content-width, 80%);
        margin: auto;
        margin-top: ${this.mainTitleWrapperMarginTop};
        z-index: 5;
        ${this.isAnimationShown ? '' : 'opacity: 0;'}
        ${this.isAnimationShown ? '' : 'transform: translateY(40%);'}
        ${this.isAnimationShown ? '' : 'animation: main-title-animation 0.3s linear forwards'}
      }
      :host > * {
        z-index: 5;
      }
      :host > h2 {
        margin: 0 auto 1rem auto;
        font-family: var(--font-family-bold);
        font-size: ${this.desktopMainTitleSize + 'rem'};
        line-height: 0.85;
      }
      :host > h4 {
        margin: 0 auto 1rem auto;
        font-family: var(--font-family-bold);
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
      }
      @keyframes main-title-animation {
        100% {	
          transform: translateY(0);
          opacity: 1;
         }
      }
    `
  }
}
