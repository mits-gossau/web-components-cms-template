// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global location */
/* global self */

/**
 * PlaylistItem can be wrapped by src/es/components/organisms/Playlist.js and expects p, h4, ul > li
 * Example at: /src/es/components/pages/ClassicsHighlights.html
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class PlaylistItem
 * @type {CustomElementConstructor}
 * @attribute {
 *
 * }
 * @css {
 * --text-align, center
 * --padding, 0
 * --text-transform, uppercase
 * --p-margin, 0
 * --p-line-height, normal
 * --h4-margin, 0
 * --h4-font-family, var(--font-family-bold)
 * --ul-flex-direction, row
 * --ul-justify-content, center
 * --ul-margin, 0
 * --ul-padding, 0
 * --ul-list-style-type, none
 * --li-margin, unset
 * --ul-justify-content-mobile, space-around
 * --li-margin-mobile, unset
 * }
 */
export default class PlaylistItem extends Shadow() {
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
   * renders the m-PlaylistItem css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        display: block;
        text-align: var(--text-align, center);
        padding: var(--padding, 0);
      }
      :host p, :host h4, :host ul li {
        text-transform: var(--text-transform, uppercase);
      }
      :host p {
        margin: var(--p-margin, 0);
        line-height: var(--p-line-height, normal);
      }
      :host h4 {
        margin: var(--h4-margin, 0);
        font-family: var(--h4-font-family, var(--font-family-bold));
      }
      :host ul {
        display: flex;
        flex-direction: var(--ul-flex-direction, row);
        justify-content: var(--ul-justify-content, center);
        margin: var(--ul-margin, 0);
        padding: var(--ul-padding, 0);
        list-style-type: var(--ul-list-style-type, none);
      }
      :host ul li {
        margin: var(--li-margin, unset);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host ul {
          justify-content: var(--ul-justify-content-mobile, space-around);
        }
        :host ul li {
          margin: var(--li-margin-mobile, unset);
        }
      }
    `
  }
}