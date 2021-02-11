// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Picture 
 *  // TODO Description
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Picture
 * @type {CustomElementConstructor}
 * @attribute {
 *  {array[string]} [sources] array of the different image URL's
 *  {string} [alt] alt-text for the image
 *  {number} [width] explicitly set the target width
 *  {number} [height] explicitly set the target height
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
    return !this.picture && !this.img
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`

    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    let test = ["test", "test2", "test3"];
    test.map
    this.html = /* html */`
      <picture>
        ${[...test]}
      </picture>
    `;
  }

  get picture () {
    return this.root.querySelector('picture')
  }

  get img () {
    return this.root.querySelector('img')
  }
}