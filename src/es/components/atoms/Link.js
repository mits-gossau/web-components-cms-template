// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Link
 * @type {CustomElementConstructor}
 */
export default class Link extends Shadow() {
  constructor (children = []) {
    super()

    this.addedChildren = children
  }
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
    return !this.a && !!this.getAttribute('href')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host > a{
        box-sizing: border-box;
        color: var(--font-color);
        display: block;
        font-size: var(--font-size, 1.2rem);
        font-weight: var(--font-weight, 300);
        height: 100%;
        padding: var(--padding, 14px 10px);
        text-align: var(--text-align, left);
        text-decoration: none;
        text-transform: ${this.getAttribute('text-transform') || 'none'};
        width: 100%;
      }
      :host > a:hover{
        color: var(--font-color-hover);
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.html = /* html */`
      <a href=${this.getAttribute('href')}>${this.textContent}</a>
    `
    Array.from(this.addedChildren).forEach(child => this.a.appendChild(child))
  }

  get a () {
    return this.root.querySelector('a')
  }
}