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
 * --button-font-family [var(--font-family-bold)]
 * }
 */
export default class Button extends Shadow() {
  constructor (...args) {
    super(...args)

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
              }
            `
          } else if (name === 'src-secondary') {
            outerThis.css = /* css */`
              :host button:focus,
              :host button:hover,
              :host button:active {
                background: url(${src}) var(--color) no-repeat center;
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
        width: var(--width, unset);
        height: var(--height, unset);
        display: var(--display, block);
        margin: var(--margin, 0);
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
        font-family: var(--button-font-family, var(--font-family-bold));
        font-size: var(--button-font-size, 0.8rem);
        text-transform: var(--button-text-transform, none);
      }
      :host button:focus,
      :host button:hover,
      :host button:active {
        background: var(--color);
        color: var(--background-color, red);
      }
      /*:host button:disabled {
        // search submit takes too little time for disabled style to make sense, maybe for newsletter?
      }*/
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      }
    `
  }

  get button () {
    return this.root.querySelector('button')
  }
}
