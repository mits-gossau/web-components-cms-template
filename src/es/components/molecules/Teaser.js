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
        display: flex;
        flex-direction: column;
        margin: 0;
        background-color: var(${backgroundColor}, #c2262f);
      }
      /* fallback if a-picture is not used */
      :host figure picture {
        height: var(--height, 300px);
        overflow: hidden;
      }
      :host figure > picture > img {
        min-height: var(--min-height, 100%);
        height: auto;
        object-fit: var(--object-fit, cover);
        width: 100%;
      }
      :host figure figcaption {
        background-color: var(${backgroundColor}, #c2262f);
        padding: var(${figcaptionPadding}, 15px 15px 20px 15px);
        opacity: var(--opacity, 1);
      }
      :host figcaption h2 {
        color: var(--h2-color, var(--color, black));
        font-size: var(--h2-font-size, min(4rem, 10vw));
        font-family: var(--h2-font-family, var(--font-family-bold));
        font-weight: var(--h2-font-weight, var(--font-weight, normal));
        line-height: var(--h2-line-height, normal);
        text-align: var(--h2-text-align, start);
        word-break: var(--h2-word-break, normal);
        text-transform: var(--h2-text-transform, none);
        margin: var(--h2-margin, var(--content-spacing, unset)) auto;
        padding: var(--h2-padding, unset);
      }
      :host figcaption h3 {
        color: var(--h3-color, var(--color, black));
        font-size: var(--h3-font-size, min(3rem, 10vw));
        font-family: var(--h3-font-family, var(--font-family-bold));
        font-weight: var(--h3-font-weight, var(--font-weight, normal));
        line-height: var(--h3-line-height, normal);
        text-align: var(--h3-text-align, start);
        word-break: var(--h3-word-break, normal);
        text-transform: var(--h3-text-transform, none);
        margin: var(--h3-margin, var(--content-spacing, unset)) auto;
        padding: var(--h3-padding, unset);
      }
      :host figcaption h4 {
        color: var(--h4-color, var(--color, black));
        font-size: var(--h4-font-size, min(2rem, 10vw));
        font-family: var(--h4-font-family);
        font-weight: var(--h4-font-weight, var(--font-weight, normal));
        line-height: var(--h4-line-height, normal);
        text-align: var(--h4-text-align, start);
        word-break: var(--h4-word-break, normal);
        text-transform: var(--h4-text-transform, none);
        margin: var(--h4-margin, var(--content-spacing, unset)) auto;
        padding: var(--h4-padding, unset);
      }
      :host figcaption h5 {
        color: var(--h5-color, var(--color, black));
        font-size: var(--h5-font-size, min(1.5rem, 10vw));
        font-family: var(--h5-font-family, var(--font-family-secondary));
        font-weight: var(--h5-font-weight, var(--font-weight, normal));
        line-height: var(--h5-line-height, normal);
        text-align: var(--h5-text-align, start);
        word-break: var(--h5-word-break, normal);
        text-transform: var(--h5-text-transform, none);
        margin: var(--h5-margin, var(--content-spacing, unset)) auto;
        padding: var(--h5-padding, unset);
      }
      :host figcaption h6 {
        color: var(--h6-color, var(--color, black));
        font-size: var(--h6-font-size, min(1.5rem, 10vw));
        font-family: var(--h6-font-family, var(--font-family-secondary));
        font-weight: var(--h6-font-weight, var(--font-weight, normal));
        line-height: var(--h6-line-height, normal);
        text-align: var(--h6-text-align, start);
        word-break: var(--h6-word-break, normal);
        text-transform: var(--h6-text-transform, none);
        margin: var(--h6-margin, var(--content-spacing, unset)) auto;
        padding: var(--h6-padding, unset);
      }
      :host figcaption p {
        font-family: var(--p-font-family, var(--font-family-secondary));
        font-weight: var(--p-font-weight, var(--font-weight, normal));
        text-align: var(--p-text-align, start);
        text-transform: var(--p-text-transform, none);
        margin: var(--p-margin, var(--content-spacing, unset)) auto;
      }
      :host figcaption a {
        color: var(--a-color, var(--color-secondary, var(--color, pink)));
        font-weight: var(--a-font-weight, var(--font-weight, normal));
        text-align: var(--a-text-align, unset);
        text-decoration: var(--a-text-decoration, var(--text-decoration, none));
        text-underline-offset: var(--a-text-underline-offset, unset);
        display: var(--a-display, inline);
        margin: var(--a-margin, var(--content-spacing, unset)) auto;
      }
      :host figcaption a:hover, :host figcaption a:active, :host figcaption a:focus {
        color: var(--a-color-hover, var(--color-hover-secondary, var(--color-hover, var(--color, green))));
        text-decoration: var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none))));
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host figcaption h2 {
          font-size: var(--h2-font-size-mobile, var(--h2-font-size, min(4rem, 14vw)));
          line-height: var(--h2-line-height-mobile, var(--h2-line-height, normal));
          word-break: var(--h2-word-break-mobile, var(--h2-word-break, normal));
          text-transform: var(--h2-text-transform-mobile, var(--h2-text-transform, normal));
          margin: var(--h2-margin-mobile, var(--h2-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host figcaption h3 {
          font-size: var(--h3-font-size-mobile, var(--h3-font-size, min(3rem, 14vw)));
          line-height: var(--h3-line-height-mobile, var(--h3-line-height, normal));
          word-break: var(--h3-word-break-mobile, var(--h3-word-break, normal));
          text-transform: var(--h3-text-transform-mobile, var(--h3-text-transform, normal));
          margin: var(--h3-margin-mobile, var(--h3-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host figcaption h4 {
          font-size: var(--h4-font-size-mobile, var(--h4-font-size, min(2rem, 14vw)));
          line-height: var(--h4-line-height-mobile, var(--h4-line-height, normal));
          word-break: var(--h4-word-break-mobile, var(--h4-word-break, normal));
          text-transform: var(--h4-text-transform-mobile, var(--h4-text-transform, normal));
          margin: var(--h4-margin-mobile, var(--h4-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host figcaption h5 {
          font-size: var(--h5-font-size-mobile, var(--h5-font-size, min(1.5rem, 14vw)));
          line-height: var(--h5-line-height-mobile, var(--h5-line-height, normal));
          word-break: var(--h5-word-break-mobile, var(--h5-word-break, normal));
          text-transform: var(--h5-text-transform-mobile, var(--h5-text-transform, normal));
          margin: var(--h5-margin-mobile, var(--h5-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host figcaption h6 {
          font-size: var(--h6-font-size-mobile, var(--h6-font-size, min(1.5rem, 14vw)));
          line-height: var(--h6-line-height-mobile, var(--h6-line-height, normal));
          word-break: var(--h6-word-break-mobile, var(--h6-word-break, normal));
          text-transform: var(--h6-text-transform-mobile, var(--h6-text-transform, normal));
          margin: var(--h6-margin-mobile, var(--h6-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host figcaption p {
          text-transform: var(--p-text-transform-mobile, var(--p-text-transform, none));
          margin: var(--p-margin-mobile, var(--p-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
        :host figcaption a {
          margin: var(--a-margin-mobile, var(--a-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
      }
    `
  }
}
