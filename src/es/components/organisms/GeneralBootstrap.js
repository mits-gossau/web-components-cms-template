// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class GeneralBootstrap
 * @type {CustomElementConstructor}
 */
export default class GeneralBootstrap extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderHTML()) this.renderHTML().then(() => {
      $(this.root).find('.carousel').each((i, carousel) => {
        carousel = $(carousel)
        carousel.find('.carousel-control-prev').click(event => carousel.carousel('prev'))
        carousel.find('.carousel-control-next').click(event => carousel.carousel('next'))
        carousel.carousel()
      })
    })
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.scripts
  }

  /**
   * renders the o-highlight-list css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        grid-area: general;
      }
      :host > *:not(#scripts) {
        margin: var(--content-margin) auto;
        width: var(--content-width);
      }
      h1 {
        font-size: 6rem;
      }
      h2 {
        font-size: 5rem;
        font-family: var(--font-family-secondary);
      }
      h3 {
        font-size: 3rem;
      }
      h4 {
        font-size: 2rem;
      }
      p {
        font-size: 1.5rem;
        font-family: var(--font-family-secondary);
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {Promise<void>}
   */
  renderHTML () {
    return new Promise((resolve) => {
      const scripts = document.createElement('section')
      scripts.setAttribute('id', 'scripts')
      scripts.innerHTML = /* html */`<link rel=stylesheet href=https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css>`
      const jquery = document.createElement('script')
      jquery.setAttribute('src', 'https://code.jquery.com/jquery-3.5.1.slim.min.js')
      jquery.onload = event => {
        const bootstrap = document.createElement('script')
        bootstrap.setAttribute('src', 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js')
        bootstrap.onload = event => resolve()
        scripts.appendChild(bootstrap)
      }
      scripts.appendChild(jquery)
      this.html = scripts
    })
  }

  get scripts () {
    return this.root.querySelector('#scripts')
  }
}