// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/**
 * Arrow is an icon
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Arrow
 * @type {CustomElementConstructor}
 * @attribute {
 *  {up, right, down, left, up-right} [direction=left]
 * }
 * @css {
 *  --color [#777]
 *  --font-size [1.2rem]
 *  --color-hover [white]
 * }
 */
export default class Arrow extends Shadow() {
  static get observedAttributes() {
    return ['direction']
  }

  connectedCallback() {
    // @ts-ignore
    this.customColor = getComputedStyle(this).getPropertyValue('--color')
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'direction' && this.span) {
      if (newValue === 'toggle') this.setAttribute('direction', (newValue = this.span.classList.contains('up') ? 'down' : this.span.classList.contains('down') ? 'up' : newValue))
      this.span.className = newValue
    }
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML() {
    return !this.span
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */`
      :host > span{
        align-items: center;
        color: var(--color, #777);
        cursor: pointer;
        display: flex;
        font-size: var(--font-size, 1.2rem);
        height: 100%;
        justify-content: center;
        width: 100%;
      }
      :host > span:hover{
        color: var(--color-hover, var(--color, white));
      }
      :host > span.up{
        transform: rotate(90deg);
      }
      :host > span.right{
        transform: rotate(180deg);
      }
      :host > span.down{
        transform: rotate(270deg);
      }
      :host > span.left{
        transform: rotate(0deg);
      }
      :host > span.up-right{
        transform: rotate(-45deg);
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML() {
    this.html = /* html */`
      <span class=${this.getAttribute('direction')}><svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1038_650)">
      <path d="M7.17199 5.61719L13.3909 11.8361H0.953125V13.2247H13.3909L7.17199 19.4436H9.13426L16.0475 12.5304L9.13426 5.61719H7.17199Z" fill="${this.customColor || '#777'}"/>
      </g>
      <defs>
      <clipPath id="clip0_1038_650">
      <rect width="15.0943" height="15.0943" fill="white" transform="translate(0.953125 4.95288)"/>
      </clipPath>
      </defs>
      </svg>
      </span>
    `
  }

  get span() {
    return this.root.querySelector('span')
  }
}
