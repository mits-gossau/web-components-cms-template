// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Title is the navigation Title
 * Example at: /src/es/components/pages/Home.html
 * Title-Text gets split by spaces. Each word is wrapped with a <span> and the last <span> receives the class "secondary-color".
 * 
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
      :host {
        margin: var(--margin, min(9vw, 60px) 0 0 0);
      }
      :host h1{
        color: var(--color, white);
        font-size: var(--font-size, max(79px, 4vw));
        font-family: var(--font-family-bold, 'OPTIFutura-ExtraBlackCond');
        margin: 0;
        line-height: var(--line-height, max(69px, 3.5vw));
        text-transform: var(--text-transform, uppercase);
        transition: var(--transition, all 0.2s ease);
      }
      :host(.${this.getAttribute('no-scroll') || 'no-scroll'}) h1 {
        color: var(--color-${this.getAttribute('no-scroll') || 'no-scroll'}, var(--color, white));
      }
      :host h1 .secondary-color {
        color: var(--color-secondary, var(--color, white));
        font-size: var(--secondary-color-font-size, var(--font-size));
        font-family: var(--secondary-color-font-family, var(--font-family-bold, 'OPTIFutura-ExtraBlackCond'));
        font-weight: var(--secondary-font-weight);
        text-transform: var(--secondary-color-text-transform, var(--text-transform, uppercase));
        transition: var(--secondary-transition, var(--transition, all 0.2s ease));
      }
      :host(.${this.getAttribute('no-scroll') || 'no-scroll'}) h1 .secondary-color {
        color: var(--color-secondary-${this.getAttribute('no-scroll') || 'no-scroll'}, var(--color-secondary, var(--color, white)));
      }
      :host h1 span {
        display: block;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host h1{
          font-size: var(--font-size-mobile, min(14vw, 49px));
          line-height: var(--line-height-mobile, var(--line-height, min(14vw, 43px)));
        }
        :host h1 .secondary-color {
          font-size: var(--secondary-color-font-size-mobile, var(--font-size-mobile));
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
    this.html = this.h1 = document.createElement('h1')
    this.textContent.split(' ').forEach((text, i, arr) => {
      const span = document.createElement('span')
      span.textContent = text
      if (i === arr.length - 1) span.classList.add('secondary-color')
      this.h1.appendChild(span)
    })
  }
}
