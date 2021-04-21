// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Button is a wrapper for a button element
 * Example at: /src/es/components/pages/ClassicsSearch.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Button
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @css {
 * 
 * --border [2px solid var(--color)] 
 * --width [unset]
 * --height [unset]
 * --display [block]
 * --color [green]
 * --button-width [70px]
 * --button-height [85px]
 * --button-transition [0.3s all]
 * --button-border [none]
 * --button-padding [0]
 * --button-cursor [pointer]
 * --background-color [red]
 * --button-font-size [0.8rem]
 * --font-family-bold
 * }
 */
export default class Button extends Shadow() {
  constructor (...args) {
    super(...args)

    this.clickEventListener = event => {
      this.dispatchEvent(new CustomEvent("form-submit", {
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.getAttribute("src")) this.applyImageIfExists(this, this.getAttribute("src"), "src")
    if (this.getAttribute("src-secondary")) this.applyImageIfExists(this, this.getAttribute("src-secondary"), "src-secondary")
    this.root.addEventListener("click", this.clickEventListener)
  }

  disconnectedCallback () {
    this.root.removeEventListener("click", this.clickEventListener)
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
   * checks if image exists and apply as background if it does
   */
  applyImageIfExists(outerThis, src, name) {
    const xhr = new XMLHttpRequest()
    xhr.open("HEAD", src, true)
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (name === "src") {
            outerThis.css = /* css */`
              :host button {
                background: url(${src}) var(--background-color) no-repeat center;
              }
          `
          } else if (name === "src-secondary") {
            outerThis.css = /* css */`
              :host button:focus,
              :host button:hover,
              :host button:active {
                background: url(${src}) var(--color) no-repeat center;
              }
            `
          }
        }
      }
    }
    xhr.send(null) 
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        border: var(--border, 2px solid var(--color)); 
        width: var(--width, unset);
        height: var(--height, unset);
        display: var(--display, block)
      }
      :host button {
        width: var(--button-width, 70px);
        height: var(--button-height, 85px);
        transition: var(--button-transition, 0.3s all);
        border: var(--button-border, none);
        padding: var(--button-padding, 0);
        cursor: var(--button-cursor, pointer);
        color: var(--color, green);
        background: var(--backgrond-color);
        font-family: var(--font-family-bold);
        font-size: var(--button-font-size, 0.8rem);
      }
      :host button:focus,
      :host button:hover,
      :host button:active {
        background: var(--color);
        color: var(--background-color, red);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      }
    `
  }

}
