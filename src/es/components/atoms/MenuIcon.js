// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/**
 * MenuIcon is the mobile hamburger menu icon
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class MenuIcon
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [openClass=open]
 *  {string} [barClass=bar]
 *  {string} [transition=0.2s]
 * }
 * @css {
 *  --height [5px]
 *  --width [35px]
 *  --background-color [white]
 *  --transition [0.2s]
 * }
 */
export default class MenuIcon extends Shadow() {
  constructor (...args) {
    super(...args)

    this.openClass = this.getAttribute('openClass') ? this.getAttribute('openClass') : 'open'
    this.barClass = this.getAttribute('barClass') ? this.getAttribute('barClass') : 'bar'

    this.clickListener = event => this.toggleAnimationClass()
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    if (!this.hasAttribute('no-click')) this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    if (!this.hasAttribute('no-click')) this.removeEventListener('click', this.clickListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('div')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: inline-block;
        cursor: pointer;
        transition: var(--transition, 0.2s);
        padding: var(--padding, 0 calc(var(--width, 35px) / 4)) !important;
        margin: var(--margin, 0);
        transition: var(--transition, 0.2s);
      }
      :host(.${this.openClass}) {
        padding: var(--padding-open, 0 calc(var(--width, 35px) / 4)) !important;
      }
      .${this.barClass}1, .${this.barClass}2, .${this.barClass}3 {
        width: var(--width, 35px);
        height: var(--height, 5px);
        background-color: var(--background-color, white);
        margin: 0;
        transition: var(--transition, all 0.2s ease);
        border-radius: var(--border-radius, 0);
      }
      .${this.barClass}2 {
        margin: var(--spacing, var(--height, 5px)) 0;
        transition: var(--transition, 0.2s);
      }
      /* Rotate first ${this.barClass} */
      :host(.${this.openClass}) .${this.barClass}1, :host(.${this.openClass}) .${this.barClass}2 {
        transform: var(--one-transform, rotate(-45deg) translateY(calc(var(--height, 5px) * 5.5 / 2)));
      }
      /* Fade out the second ${this.barClass} */
      :host(.${this.openClass}) .${this.barClass}2 {
        opacity: 0;
      }
      /* Rotate last ${this.barClass} */
      :host(.${this.openClass}) .${this.barClass}3 {
        transform: var(--two-transform, rotate(45deg) translateY(calc(var(--height, 5px) * -5.5 / 2)));
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
      <div class="${this.barClass}1"></div>
      <div class="${this.barClass}2"></div>
      <div class="${this.barClass}3"></div>
    `
  }

  toggleAnimationClass (command = 'toggle') {
    this.classList[command](this.openClass)
  }
}
