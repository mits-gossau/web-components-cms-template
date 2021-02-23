// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Title is the navigation Title
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Title
 * @type {CustomElementConstructor}
 * @css {
 *  --font-family-bold [OPTIFutura-ExtraBlackCond]
 *  --color [white]
 *  --color-secondary [white]
 * }
 */
export default class Title extends Shadow() {
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
    return !this.h1
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host{
        margin: min(9vw, 60px) 0 0 0;
      }
      :host h1{
        text-transform: uppercase;
        color: var(--color,white);
        font-size: min(14vw, 3.95rem);
        font-family: var(--font-family-bold, 'OPTIFutura-ExtraBlackCond');
        margin: 0;
        line-height: min(14vw, 3.45rem);
      }
      :host h1 .secondary-color {
        color: var(--color-secondary, white);
      }
      :host h1 span {
        display: block;
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.html = this.h1 = document.createElement('h1')
    this.textContent.split(' ').forEach((text, i, arr) => {
      const span = document.createElement('span')
      span.textContent = text
      if (i === arr.length - 1) span.classList.add('secondary-color')
      this.h1.appendChild(span)
    })
  }
}