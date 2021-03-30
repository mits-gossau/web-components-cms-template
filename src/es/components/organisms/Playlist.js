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
 *  {boolean} [top-border-first-child] show top border on first playlist-item
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
      :host {
        display: block;
        width: var(--width, 80%);
        margin: var(--margin, unset auto);
      }
      :host > *:first-child {
        border-top: ${this.getAttribute("top-border-first-child") === "true" ? "var(--border-top, unset)" : "unset"};
      }
      :host > * {
        border-bottom: var(--border-bottom, unset);
      }
      
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          width: var(--width-mobile, var(--width, 100%));
          margin: var(--margin-mobile, var(--margin, unset auto));
        }
        :host > *:first-child {
          border-top: ${this.getAttribute("top-border-first-child") === "true" ? "var(--border-top-mobile, var(--border-top, unset))" : "unset"};
        }
        :host > * {
          border-bottom: var(--border-bottom-mobile, var(--border-bottom, unset));
        }
      }
    `
  }
}
