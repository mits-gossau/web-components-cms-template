// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Picture is a reusable component for all pictures
 * Example at: //TODO example
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Picture
 * @type {CustomElementConstructor}
 * //TODO add attributes and css-variables
 * @attribute {
 *  //{string} src used for the image source
 *  //{string} href used for the link reference
 * }
 * @css {
 *  //--content-spacing [40px]
 *  //--height-desktop [85px]
 *  //--height-mobile [50px]
 * }
 */
export default class Picture extends Shadow() {
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
    return !this.img && !!this.getAttribute('src')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    // this.css = /* css */`
    //   :host{
    //     align-items: center;
    //     display: flex;
    //     justify-content: center;
    //     box-sizing: border-box;
    //   }
    //   :host img{
    //     display: block;
    //     height: calc(var(--height-desktop, 85px) - var(--content-spacing, 40px));
    //     object-fit: scale-down;
    //   }
    //   @media only screen and (max-width: ${self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
    //     :host img{
    //       height: calc(var(--height-mobile, 50px) - var(--content-spacing, 40px) / 2);
    //     }
    //   }
    // `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    // const img = `<img src=${this.getAttribute('src')}>`
    // let a = null
    // if (!!this.getAttribute('href')) {
    //   a = document.createElement('a')
    //   a.setAttribute('href', this.getAttribute('href'))
    //   a.innerHTML = img
    // }
    // this.html = a ? a : img


  }

  // get a () {
  //   return this.root.querySelector('a')
  // }

  // get img () {
  //   return this.root.querySelector('img')
  // }
}