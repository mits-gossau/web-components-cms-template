// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class MenuIcon
 * @type {CustomElementConstructor}
 */
export default class MenuIcon extends Shadow() {
  constructor () {
    super()

    this.width = this.getAttribute('width') ? this.getAttribute('width') : '35px'
    this.height = this.getAttribute('height') ? this.getAttribute('height') : '5px'
    this.openClass = this.getAttribute('openClass') ? this.getAttribute('openClass') : 'open'
    this.barClass = this.getAttribute('barClass') ? this.getAttribute('barClass') : 'bar'
    this.transition = this.getAttribute('transition') ? this.getAttribute('transition') : '0.2s'

    this.addEventListener('click', event => this.toggleAnimationClass())
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
        transition: ${this.transition};
        padding: 0 calc(${this.width} / 4) !important;
      }
      :host(.${this.openClass}) {
        padding: 0 calc(${this.width} / 4) !important;
      }
      .${this.barClass}1, .${this.barClass}2, .${this.barClass}3 {
        width: ${this.width};
        height: ${this.height};
        background-color: ${this.getAttribute('color') ? this.getAttribute('color') : 'var(--font-color, #333)'};
        margin: 0;
        transition: ${this.transition};
      }
      .${this.barClass}2 {
        margin: ${this.height} 0;
        transition: ${this.transition} / 2;
      }
      /* Rotate first ${this.barClass} */
      :host(.${this.openClass}) .${this.barClass}1, :host(.${this.openClass}) .${this.barClass}2 {
        transform: rotate(-45deg) translateY(calc(${this.height} * 5.5 / 2));
      }
      /* Fade out the second ${this.barClass} */
      :host(.${this.openClass}) .${this.barClass}2 {
        opacity: 0;
      }
      /* Rotate last ${this.barClass} */
      :host(.${this.openClass}) .${this.barClass}3 {
        transform: rotate(45deg) translateY(calc(-${this.height} * 5.5 / 2));
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