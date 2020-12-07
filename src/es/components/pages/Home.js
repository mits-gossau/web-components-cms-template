// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As a page, this component becomes a domain dependent container and shall hold organisms, molecules and/or atoms
 *
 * @export
 * @class Home
 * @type {CustomElementConstructor}
 */
export default class Home extends Shadow() {
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
   * renders the p-home css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        color: black;
        --height: var(--header-height-desktop);
        display: grid;
        grid-template-areas: "header"
                             "stage"
                             "highlight-list"
                             "footer";
        grid-template-rows: var(--header-height-desktop) calc(100vh - var(--header-height-desktop)) 1fr minmax(var(--footer-min-height-desktop), auto);
        grid-template-columns: 1fr;
        min-height: 100vh;
      }
      @media only screen and (max-width: 1000px) {
        :host {
          --height: var(--header-height-mobile);
          grid-template-rows: var(--header-height-mobile) calc(100vh - var(--header-height-mobile)) 1fr minmax(var(--footer-min-height-mobile), auto);
        }
      }
    `
  }
}