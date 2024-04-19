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
      if (screen.width >= this.mobileBreakPoint) {
        this.desktopOffset = 0
        if (this.mobileOffset === 0) this.mobileOffset = +this.offsetTop
        this.mainTitleWrapperMarginTop = Math.ceil(+imgHeight - this.mobileOffset + +this.customMobileMarginTop) + "px"
      } else {
        this.mobileOffset = 0
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
      }
      :host > a-link {
        margin: auto;
        --width: max-content;
        --text-align: center;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          width: var(--content-width-mobile, var(--content-width, 90%));
        }
      }
    `
  }
}
