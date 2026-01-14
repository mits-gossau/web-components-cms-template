// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */
/* global CustomEvent */

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
 *  {string} [open-modal=""] does emit event with name set by open-modal which can be reacted on by eg. organisms/Modal.js
 *  {string} [picture-load=""] does emit event with name set by picture-load which can be reacted on by eg. molecules/Flyer.js
 *  {string} [custom-width] width of the image
 *  {string} [img-width] original width of the image
 *  {string} [img-height] original height of the image
 * 
 * 
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
  static get observedAttributes() {
    return ['loading', 'pointer-events']
  }

  constructor(...args) {
    super(...args)
    this.sources = (this.getAttribute('sources') && Picture.parseAttribute(this.getAttribute('sources'))) || null
    this.defaultSource = this.getAttribute('defaultSource') ? this.getAttribute('defaultSource') : ''
    this.alt = this.getAttribute('alt') ? this.getAttribute('alt') : ''
    this.customWidth = this.getAttribute('custom-width-%')
    this.customMobileWidth = this.getAttribute('custom-mobile-width-%') ? this.getAttribute('custom-mobile-width-%') : this.getAttribute('custom-width')
    this.hasLandingAnimation = this.getAttribute('landing-animation') === 'true'
    this.isAnimationShown = false
    this.imgWidth = this.getAttribute('img-width')
    this.imgHeight = this.getAttribute('img-height')
    this.imgAspectRatio = this.imgWidth / this.imgHeight

    this.clickListener = event => {
      if (!this.hasAttribute('open')) event.stopPropagation()
      this.dispatchEvent(new CustomEvent(this.getAttribute('open-modal') || 'open-modal', {
        detail: {
          origEvent: event,
          child: this
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback() {
    if (this.hasLandingAnimation) this.isAnimationShown = document.referrer.includes(location.origin)
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) {
      this.renderHTML()
      if (this.hasAttribute('preview')) this.renderHTML(undefined, this.getAttribute('preview'))
    }
    if (this.hasAttribute('open-modal')) this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback() {
    if (this.hasAttribute('open-modal')) this.removeEventListener('click', this.clickListener)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.img) {
      if (name === 'loading') {
        this.img.setAttribute(name, newValue)
      } else if (name === 'pointer-events') {
        this.css = /* css */`
          :host picture img {
            pointer-events: ${newValue};
          }
        `
      }
    }
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML() {
    return !this.root.querySelector('picture')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */`
      :host {
        text-align: var(--text-align, center);
        display: var(--display, grid);
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
      }
      :host > picture {
        grid-column: 1;
        grid-row: 1;
        z-index: 1;
        display: var(--display, inline); /* don't use flex here, it can have strange side effects */
      }
      :host > picture[preview] {
        z-index: 0;
      }
      :host([open-modal]) {
        cursor: pointer;
      }
      :host picture {
        filter: var(--filter, none);
        display: var(--display, block); /* don't use flex here, it can have strange side effects */
        justify-content: var(--justify-content, center);
        height: var(--height, unset);
        overflow: var(--overflow, initial);
        transition: var(--transition, none);
        margin: var(--margin, 0);
        transform: var(--transform, none);
        text-align: var(--text-align, center);
        width: ${this.customWidth ? `${this.customWidth}%;` : `var(--width, "unset")};`}
      }
      :host picture:hover {
        filter: var(--filter-hover, var(--filter, none));
      }
      :host picture img {
        aspect-ratio: ${this.imgAspectRatio ? `${this.imgAspectRatio};` : `var(--aspect-ratio, attr(width, auto) / attr(height, auto));`};
        object-fit: var(--img-object-fit, contain);
        display: var(--img-display, block);
        border-radius:var(--border-radius, 0);
        width: ${this.imgWidth ? `${this.imgWidth}px;` : ` var(--img-width, max-content);`};
        min-width: var(--img-min-width, unset);
        max-width: var(--img-max-width, 100%); /* max-content would have been nice to not scale up the image, but in general make the editor use big enough images and this must stay at 100% default value, otherwise there are several side effects */
        height: var(--img-height, auto);
        min-height: var(--img-min-height, unset);
        max-height: var(--img-max-height, 75vh);
        object-fit: var(--img-object-fit, contain); /* cover does not render the same on IOS */
        vertical-align: middle; /* use middle to avoid having a gap at the bottom of the image https://stackoverflow.com/questions/5804256/image-inside-div-has-extra-space-below-the-image */
        margin: var(--img-margin, auto);
        ${this.hasLandingAnimation && !this.isAnimationShown ? 'opacity: 0; transform: translateY(-100%);' : ''}
        ${this.hasLandingAnimation && !this.isAnimationShown ? 'animation: img-animation 0.5s linear 0.75s forwards' : ''}

      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host picture {
          border-radius:var(--border-radius-mobile, 0);
          transition: var(--transition-mobile, none);
          transform: var(--transform-mobile, none);
          filter: var(--filter-mobile, none);
          height: var(--height-mobile, var(--height, unset));
          text-align: var(--text-align-mobile, var(--text-align, center));
          width: ${this.customMobileWidth ? `${this.customMobileWidth}%;` : `var(--width-mobile, var(--width, 100%));`};
        }
        :host picture img {
          border-radius:var(--border-radius-mobile, 0);
        }
      }

      @keyframes img-animation {
        100% {	
          opacity: 1;
          transform: translateY(0);
         }
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML(picture = document.createElement('picture'), pictureQuery = '') {
    this.html = picture
    if (pictureQuery) picture.setAttribute('preview', '')

    // in case someone adds sources/img directly instead of using the attributes
    Array.from(this.root.children).forEach(node => {
      if (node.nodeName === 'SOURCE' || node.nodeName === 'IMG') picture.appendChild(node)
    })

    if (this.sources) {
      this.sources.forEach(i => {
        if (i.src !== '' && i.type !== '' && i.size !== '') {
          switch (i.size) {
            case 'small':
              picture.innerHTML += `<source srcset="${i.src + pictureQuery}" type="${i.type}" media="(max-width: 400px)">`
              break
            case 'medium':
              picture.innerHTML += `<source srcset="${i.src + pictureQuery}" type="${i.type}" media="(min-width: 401px) and (max-width: 600px)">`
              break
            case 'large':
              picture.innerHTML += `<source srcset="${i.src + pictureQuery}" type="${i.type}" media="(min-width: 601px) and (max-width: 1200px)">`
              break
            case 'extra-large':
              picture.innerHTML += `<source srcset="${i.src + pictureQuery}" type="${i.type}" media="(min-width: 1201px)">`
              break
            default:
              picture.innerHTML += `<source srcset="${i.src + pictureQuery}" type="${i.type}">`
              break
          }
        } else {
          console.warn(`a-picture src - missing attributes: ${i.src === '' ? 'src' : ''} ${i.type === '' ? 'type' : ''} ${i.size === '' ? 'size' : ''}`)
        }
      })
    }
    if (this.defaultSource) {
      picture.innerHTML += `<img src="${this.defaultSource + pictureQuery}" alt="${this.alt}">`
      if (this.alt === '') {
        console.warn('a-picture alt is missing')
      }
    } else {
      console.warn(`a-picture defaultSource ${this.alt === '' ? '& alt ' : ''}is missing`)
    }
    if (this.hasAttribute('picture-load')) {
      this.img.addEventListener('load', event => {
        this.setAttribute('loaded', 'true')
        this.dispatchEvent(new CustomEvent(this.getAttribute('picture-load') || 'picture-load', {
          detail: {
            origEvent: event,
            child: this,
            img: this.img,
            picture: picture
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      })
      this.img.setAttribute('loading', 'eager') // must load eager, not that the loading event doesn't trigger emit picture-load
    } else {
      this.img.setAttribute('loading', this.getAttribute('loading') || 'lazy')
    }
  }

  get img() {
    return this.root.querySelector('picture:not([preview]) > img')
  }
}
