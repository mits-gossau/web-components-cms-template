// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Picture 
 * Wrapper for a picture-tag with multiple sources
 * Makes it easier for backend-user by accepting sources as array and applying media-queries according to size-attribute 
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Picture
 * @type {CustomElementConstructor}
 * @attribute {
 *  sources [array] 
 *  [{
 *    source [string]
 *    type [string] e.g. image/jpg, image/webp, etc.
 *    size [string=small, medium, large, extra-large] corresponds to different media queries
 *  }, {...}, {...}] 
 * 
 *  {string} [defaultSource] the default source for the img-tag
 *  {string} [alt] alt-text for the image
 *  {string} [loading=lazy] image loading
 * }
 * @css {
 *  --width [100%]
 *  --max-width [100%]
 *  --height [auto]
 *  --min-height [100%]
 *  --object-fit [cover]
 * }
 */
export default class Picture extends Shadow() {
  constructor(...args) {
    super(...args)
    this.sources = this.getAttribute('sources') && Picture.parseAttribute(this.getAttribute('sources')) || null
    this.defaultSource = this.getAttribute("defaultSource") ? this.getAttribute("defaultSource") : ""
    this.alt = this.getAttribute("alt") ? this.getAttribute("alt") : ""
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
    return !this.picture
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host picture {
        display: var(--display, block);
        width: var(--width, unset);
        height: var(--height, unset);
        overflow: var(--overflow, initial);
        filter: var(--filter, none);
        transition: var(--transition, none);
        margin: var(--margin, 0);
      }
      :host picture:hover {
        filter: var(--filter-hover, none);
      }
      :host picture img {
        width: var(--img-width, 100%);
        max-width: var(--img-max-width, 100%);
        height: var(--img-height, auto);
        min-height: var(--img-min-height, 100%);
        object-fit: var(--img-object-fit, cover);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host picture {
          width: var(--width-mobile, 100%);
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
    this.html = this.picture = document.createElement('picture')

    // in case someone adds sources/img directly instead of using the attributes
    Array.from(this.root.children).forEach(node => {
      if (node.nodeName === "SOURCE" || node.nodeName === "IMG") this.picture.appendChild(node)
    })

    if (this.sources) {
      this.sources.forEach(i => {
        if (i.src !== "" && i.type !== "" && i.size !== "") {
          switch (i.size) {
            case "small": 
            this.picture.innerHTML += `<source srcset="${i.src}" type="${i.type}" media="(max-width: 767px)">`
            break;
            case "medium": 
            this.picture.innerHTML += `<source srcset="${i.src}" type="${i.type}" media="(min-width: 768px) and (max-width: 990px)">`
            break;
            case "large": 
            this.picture.innerHTML += `<source srcset="${i.src}" type="${i.type}" media="(min-width: 991px) and (max-width: 1200px)">`
            break;
            case "extra-large": 
            this.picture.innerHTML += `<source srcset="${i.src}" type="${i.type}" media="(min-width: 1201px)">`
            break;
            default:
            this.picture.innerHTML += `<source srcset="${i.src}" type="${i.type}">`
            break;
          }
        } else {
          console.warn(`a-picture src - missing attributes: ${i.src === "" ? "src" : ""} ${i.type === "" ? "type" : ""} ${i.size === "" ? "size" : ""}`)
        }
      })
    }
    if (this.defaultSource) {
      this.picture.innerHTML += `<img src="${this.defaultSource}" alt="${this.alt}">`
      if (this.alt === "") {
        console.warn("a-picture alt is missing")
      }
    } else {
      console.warn(`a-picture defaultSource ${this.alt === "" ? "& alt ": ""}is missing`)
    }

    this.img.setAttribute('loading', this.getAttribute('loading') || 'lazy')
  }

  get img () {
    return this.root.querySelector('img')
  }

}