// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global CustomEvent */
/* global fetch */
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
 * --button-font-family [var(--font-family-bold)]
 * }
 */
export default class Button extends Shadow() {
  constructor (button, ...args) {
    super(...args)

    this.button = button
 
    this.clickEventListener = event => {
      // disable button while loading results, prevent spamming requests
      event.target.disabled = true
      this.dispatchEvent(new CustomEvent('form-submit',
        {
          detail: {
            button: event.target
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    if (this.getAttribute('src')) this.applyImageIfExists(this, this.getAttribute('src'), 'src')
    if (this.getAttribute('src-secondary')) this.applyImageIfExists(this, this.getAttribute('src-secondary'), 'src-secondary')
    this.root.addEventListener('click', this.clickEventListener)
  }

  disconnectedCallback () {
    this.root.removeEventListener('click', this.clickEventListener)
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
    return !this.root.querySelector('button')
  }

  /**
   * checks if image exists and apply as background if it does
   */
  applyImageIfExists (outerThis, src, name) {
    fetch(src, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          if (name === 'src') {
            outerThis.css = /* css */`
              :host button {
                background: url(${src}) var(--background-color) no-repeat center;
                background-size: var(--background-size, 45px);
              }
            `
          } else if (name === 'src-secondary') {
            outerThis.css = /* css */`
              :host button:focus,
              :host button:hover,
              :host button:active {
                background: url(${src}) var(--color) no-repeat center;
                background-size: var(--background-size, 45px);
              }
            `
          }
        }
      })
      .catch(error => {
        console.log('Error while checking if image exists: ', error)
      })
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
        width: var(--width, 70px);
        height: var(--height, 85px);
        margin: var(--margin, 0);
      }
      :host button {
        width: var(--button-width, 100%);
        height: var(--button-height, 100%);
        transition: var(--button-transition, 0.3s all);
        border: var(--button-border, none);
        padding: var(--button-padding, 0);
        cursor: var(--button-cursor, pointer);
        color: var(--color, green);
        background-color: var(--background-color);
        font-family: var(--button-font-family, var(--font-family-bold));
        font-size: var(--button-font-size, 0.8rem);
        text-transform: var(--button-text-transform, none);
      }
      :host button:focus,
      :host button:hover,
      :host button:active {
        background-color: var(--color);
        color: var(--background-color, red);
      }
      /*:host button:disabled {
        // search submit takes too little time for disabled style to make sense, maybe for newsletter?
      }*/
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.html = this.button
  }
}
