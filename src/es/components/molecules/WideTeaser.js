// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class WideTeaser
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} href
 * }
 * @css {
 *  --background-color [#333333]
 *  --background-color-hover [#810917]
 *  --h4-color [white]
 *  --p-color [white]
 *  --p-font-size [1.2rem]
 *  --p-font-weight [300]
 *  --h4-font-size [1.1rem]
 *  --font-family ['Roboto', (fallback)]
 *  --justify-content [center]
 *  --padding [30px 0]
 *  --min-height [100%]
 *  --object-fit [cover]
 *  --width [80%] defines the content width (width of figure-tag)
 *  --picture-min-width [350px]
 * }
 * @html {
 *  <figure>
 *    <picture>
 *     <img src="" alt="" width="" height="">
 *    </picture>
 *    <figcaption>
 *      <h4>Teaser Title</h4>
 *      <p>Teaser Text</p>
 *      <p class="moreLink">
 *        <a-arrow direction=right></a-arrow>
 *        <span>More Link Text</span>
 *      </p>
 *    </figcaption>
 *  </figure>
 * }
 */
export default class WideTeaser extends Shadow() {
  constructor (...args) {
    super(...args)

    this.clickListener = event => {
      if (this.getAttribute('href')) location.href = this.getAttribute('href')
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
    return !this.root.querySelector('style[_css]')
  }

  /**
   * renders the m-wide-teaser css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: block;
        cursor: ${this.getAttribute('href') ? 'pointer' : 'auto'};
        background-color: var(--background-color, #333333);
        margin: 0;
        width: 100%;
      }
      :host(:hover) {
        background-color: var(--background-color-hover, #810917);
      }
      :host figure {
        display: flex;
        margin: 0 auto;
        flex-wrap: wrap;
        width: var(--width, 80%);
        padding: var(--padding, 30px 0);
        justify-content: var(--justify-content, center);
      }
      :host p, :host h4, :host a {
        font-family: var(--font-family, "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif);
        color: var(--color, white);
      }
      :host h4 {
        font-size: var(--h4-font-size, 1.1rem);
        margin: 20px 0;
      }
      :host p {
        font-size: var(--p-font-size, 1.2rem);
        font-weight: var(--p-font-weight, 300);
        margin: 0 0 15px 0;
      }
      :host .moreLink {
        display: flex;
      }
      :host .moreLink a {
        text-decoration: none;
        font-size: var(--h4-font-size, 1.2rem);
      }
      :host picture, :host figcaption {
        box-sizing: border-box;
        padding: 0 15px;
      }
      :host picture {
        flex: 1 1 40%;
        min-width: min(100%, var(--picture-min-width, 300px));
      }
      :host figcaption {
        flex: 3 1 60%;
      }
      :host picture img {
        width: 100%;
        height: auto;
        min-height: var(--min-height, 100%);
        object-fit: var(--object-fit, cover);
      }
      :host figcaption a-arrow {
        margin-right: 5px;
      }
    `
  }
}