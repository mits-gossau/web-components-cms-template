// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Logo
 * @type {CustomElementConstructor}
 */
export default class Logo extends Shadow() {
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
    this.css = /* css */`
      :host{
        align-items: center;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
      }
      :host img{
        display: block;
        height: calc(var(--height) - 40px);
        object-fit: scale-down;
      }
      @media only screen and (max-width: 1000px) {
        :host img{
          height: calc(var(--height) - var(--content-margin) / 2);
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
    const img = `<img src=${this.getAttribute('src')}>`
    let a = null
    if (!!this.getAttribute('href')) {
      a = document.createElement('a')
      a.setAttribute('href', this.getAttribute('href'))
      a.innerHTML = img
    }
    this.html = a ? a : img
  }

  get a () {
    return this.root.querySelector('a')
  }

  get img () {
    return this.root.querySelector('img')
  }
}