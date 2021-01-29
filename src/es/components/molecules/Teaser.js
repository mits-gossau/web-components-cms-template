// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Teaser
 * @type {CustomElementConstructor}
 * 
 */
export default class Teaser extends Shadow() {
  constructor () {
    super()

  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
   * renders the m-Teaser css
   *
   * @return {void}
   */
  renderCSS () {
    let theme = this.getAttribute("theme");
    let backgroundColor = "--background-color";
    let fontColorH3 = "--color";
    let fontColorP = "--color";
    let figcaptionPadding = "--figcaption-padding";

    if (theme === "light") {
      backgroundColor = "--background-color-light-theme";
      fontColorH3 = "--h3-color-light-theme";
      fontColorP = "--p-color-light-theme";
      figcaptionPadding = "--figcaption-padding-light-theme";
    }

    this.css = /* css */`
      :host {
        width: 40%;
        margin: 20px;
      }
      :host figure {
        display: block;
        position: relative;
        margin: 0;
        background-color: var(${backgroundColor});
      }
      :host figure > picture {
        display: block;
        height: 350px;
        overflow: hidden;
      }
      :host figure > picture > img {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: 100%;
      }
      :host figure figcaption {
        background-color: var(${backgroundColor});
        padding: var(${figcaptionPadding});
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
      }
      :host h3, :host p {
        font-family: var(--font-family);
      }
      :host h3 {
         margin: 0 0 10px 0;
         font-size: var(--font-size-h3); 
         color: var(${fontColorH3});
      }
      :host p { 
        margin: 0;
        font-size: var(--font-size-p); 
        color: var(${fontColorP});
      }
      @media only screen and  (max-width: 768px) {
        :host {
          width: 90%;
        }
      }
    `
  }
}