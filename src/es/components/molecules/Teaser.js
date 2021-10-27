// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Teaser
 * @type {CustomElementConstructor}
 * @attribute {
 *  {boolean} [theme=false] there is only one theme, light
 * }
 * @css {
 *  --background-color [#c2262f]
 *  --background-color-light-theme
 *  --h3-color [white]
 *  --h3-color-light-theme [#c2262f]
 *  --p-color [white]
 *  --p-color-light-theme [black]
 *  --figcaption-padding [15px 15px 20px 15px]
 *  --figcaption-padding-light-theme [15px 0]
 *  --h3-font-size [1.2rem]
 *  --p-font-size [1rem]
 *  --font-family
 *  --height [300px] picture tag resp. whole teaser height
 *  --min-height [100%] if set the image covers all of the teaser resp. picture tag
 *  --object-fit [cover] image tag object fit
 *  --opacity [1]
 * }
 * @html {
 *  <figure>
 *    <picture>
 *     <img src="" alt="" width="" height="">
 *    </picture>
 *    <figcaption>
 *      <h3>Teaser Title</h3>
 *      <p>Teaser Text</p>
 *    </figcaption>
 *  </figure>
 * }
 */
export default class Teaser extends Shadow() {
  constructor (...args) {
    super(...args)

    this.clickListener = event => {
      if (this.getAttribute('href')) self.open(this.getAttribute('href'), this.getAttribute('target') || '_self')
    }
    // link behavior made accessible
    if (this.hasAttribute('href')) {
      this.setAttribute('data-href', this.getAttribute('href'))
      this.setAttribute('role', 'link')
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
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
   * renders the m-Teaser css
   *
   * @return {void}
   */
  renderCSS () {
    const theme = this.getAttribute('theme')
    let backgroundColor = '--background-color'
    let fontColorH3 = '--h3-color'
    let fontColorP = '--p-color'
    let figcaptionPadding = '--figcaption-padding'

    if (theme) {
      backgroundColor = '--background-color-light-theme'
      fontColorH3 = '--h3-color-light-theme'
      fontColorP = '--p-color-light-theme'
      figcaptionPadding = '--figcaption-padding-light-theme'
    }

    this.css = /* css */`
      :host {
        cursor: ${this.getAttribute('href') ? 'pointer' : 'auto'};
      }
      :host figure {
        display: block;
        position: relative;
        margin: 0;
        background-color: var(${backgroundColor}, #c2262f);
      }

      /* fallback if a-picture is not used */
      :host figure picture {
        display: block;
        height: var(--height, 300px);
        overflow: hidden;
      }
      :host figure > picture > img {
        width: 100%;
        min-height: var(--min-height, 100%);
        height: auto;
        object-fit: var(--object-fit, cover);
      }
      /* --------------------------- */

      :host figure figcaption {
        background-color: var(${backgroundColor}, #c2262f);
        padding: var(${figcaptionPadding}, 15px 15px 20px 15px);
        position: var(--figcaption-position, absolute);
        opacity: var(--opacity, 1);
        bottom: 0;
        left: 0;
        right: 0;
      }
      :host h3, :host p {
        font-family: var(--font-family, "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif);
        font-weight: var(--h3-font-weight, var(--font-weight, normal));
      }
      :host h3 {
         margin: 0 0 10px 0;
         font-size: var(--h3-font-size, 1.2rem); 
         color: var(${fontColorH3}, white);
      }
      :host p { 
        margin: 0;
        font-size: var(--p-font-size, 1rem); 
        color: var(${fontColorP}, white);
      }
      }
    `
  }
}
