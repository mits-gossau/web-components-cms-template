// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Highlight can be wrapped by src/es/components/organisms/HighlightList.js and expects h5, h2, p, img 
 * Example at: /src/es/components/pages/Home.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Highlight
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} href used for the link reference
 * }
 * @css {
 *  --color-hover [#8d4674]
 *  --h2-font-family [--font-family]
 *  --h2-font-size [6rem]
 *  --h2-font-size-mobile [2.5rem]
 *  --h2-text-transform [none]
 *  --h5-font-family [--font-family-secondary]
 *  --h5-font-size [1rem]
 *  --h5-text-transform [uppercase]
 *  --img-min-width [200px]
 *  --img-min-width-mobile [50px]
 *  --justify-content [center]
 *  --filter [none]
 *  --filter-hover [none]
 *  --margin [0 0 1rem 0]
 *  --p-font-family [--font-family-secondary]
 *  --p-font-size [1.5rem]
 *  --p-text-transform [none]
 *  --text-align [center]
 * }
 */
export default class Highlight extends Shadow() {
  constructor (...args) {
    super(...args)

    this.clickListener = event => {
      if (this.getAttribute('href')) location.href = this.getAttribute('href')
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return [this.h2 && this.h5 && this.p].some(node => !node || !node.parentElement || node.parentElement.nodeName !== 'SECTION') && [this.img].some(node => !node || !node.parentElement || node.parentElement.nodeName !== 'FIGURE')
  }

  /**
   * renders the m-Highlight css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        cursor: ${this.getAttribute('href') ? 'pointer' : 'auto'};
      }
      section {
        flex-grow: 1;
        flex-shrink: 2;
        text-align: var(--text-align, center);
      }
      section > * {
        margin: var(--margin, 0 0 1rem 0);
      }
      section > *:last-child {
        margin-bottom: 0;
      }
      ${this.getAttribute('href') ? `section h2:hover {
        color: var(--color-hover, #8d4674);
      }` : ''}
      figure {
        display: flex;
        flex-grow: 2;
        justify-content: var(--justify-content, center);
        margin: 0;
      }
      figure:hover img {
        filter: var(--filter-hover, none);
      }
      :host h2 {
        font-family: var(--h2-font-family, var(--font-family-bold));
        font-size: var(--h2-font-size, 6rem);
        text-transform: var(--h2-text-transform, none);
      }
      :host h5 {
        font-family: var(--h5-font-family, var(--font-family-secondary));
        font-size: var(--h5-font-size, 1rem);
        text-transform: var(--h5-text-transform, uppercase);
      }
      :host p {
        font-family: var(--p-font-family, var(--font-family-secondary));
        font-size: var(--p-font-size, 1.5rem);
        text-transform: var(--p-text-transform, none);
        margin: 3px 0;
      }
      :host p.secondaryColor {
        color: var(--color-secondary, white);
      }
      :host ul {
        list-style-type: none;
        margin-bottom: 30px;
        padding: 0;
      }
      :host ul li a {
        font-size: var(--a-font-size, 1.2rem);
        color: var(--color, black);
      }
      :host ul li a:hover {
        color: var(--color-hover, white);
      }
      img {
        filter: var(--filter, none);
        height: auto;
        object-fit: scale-down;
        max-width: var(--img-max-width, 100%);
        min-width: var(--img-min-width, 200px);
        transition: var(--transition, none);
      }
      @media only screen and (max-width: ${self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        h2 {
          font-size: var(--h2-font-size-mobile, 2.5rem);
        }
        img {
          min-width: var(--img-min-width-mobile, 50px);
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    Array.from(this.root.children).forEach(node => {
      if (node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      if (node.nodeName === 'IMG') {
        this.figure.appendChild(node)
      } else {
        this.section.appendChild(node)
      }
    })
  }

  get h2 () {
    return this.root.querySelector('h2')
  }

  get h5 () {
    return this.root.querySelector('h5')
  }

  get p () {
    return this.root.querySelector('p')
  }

  get img () {
    return this.root.querySelector('img')
  }

  get section () {
    return this.root.querySelector('section') || (() => {
      // create section if it is not yet set and position it at the correct position before or after the image
      const section = document.createElement('section')
      if (this.root.children && this.root.children[0] && (this.root.children[0].nodeName === 'IMG' || this.root.children[0].nodeName === 'FIGURE')) {
        this.root.appendChild(section)
      } else {
        this.root.prepend(section)
      }
      return section
    })()
  }

  get figure () {
    return this.root.querySelector('figure') || (() => {
      // create figure if it is not yet set and position it at the correct position before or after the image
      const figure = document.createElement('figure')
      if (this.root.children && this.root.children[0] && this.root.children[0].nodeName === 'IMG') {
        this.root.prepend(figure)
      } else {
        this.root.appendChild(figure)
      }
      return figure
    })()
  }
}
