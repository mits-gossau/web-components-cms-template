// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global location */
/* global self */

/**
 * Playlist is the wrapper for molecules/Playlist.js Elements
 * Example at: /src/es/components/pages/ClassicsHighlights.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class PlaylistItem
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @css {
 *  
 * }
 */
export default class Highlight extends Shadow() {
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
   * renders the m-Highlight css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        
      }
    `
  }
}
