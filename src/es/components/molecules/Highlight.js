// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Highlight
 * @type {CustomElementConstructor}
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
        cursor: pointer;
      }
      section {
        flex-grow: 1;
        flex-shrink: 2;
        justify-content: center;
        text-align: center;
      }
      section > * {
        margin: 0 0 1rem 0;
      }
      section > *:last-child {
        margin: 0;
      }
      section:hover h2 {
        color: var(--font-color-hover);
      }
      figure {
        display: flex;
        flex-grow: 2;
        justify-content: center;
        margin: 0;
        transition: all 0.2s ease;
      }
      h2 {
        font-size: 6rem;
      }
      h5 {
        font-family: var(--font-family-secondary);
        font-size: 1rem;
        text-transform: uppercase;
      }
      p {
        font-family: var(--font-family-secondary);
        font-size: 1.5rem;
      }
      img {
        height: auto;
        object-fit: scale-down;
        max-width: 100%;
        min-width: 200px;
      }
      @media only screen and (max-width: 1000px) {
        h2 {
          font-size: 2.5rem;
        }
        img {
          min-width: 50px;
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