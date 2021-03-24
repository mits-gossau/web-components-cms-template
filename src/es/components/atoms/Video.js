// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * Video
 * Wrapper for a video-tag with multiple sources
 * Makes it easier for backend-user by accepting sources as array and applying media-queries according to size-attribute
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Video
 * @type {CustomElementConstructor}
 * @attribute {
 *  sources [array]
 *  [{
 *    source [string]
 *    type [string?=undefined] e.g. image/jpg, image/webp, etc.
 *  }, {...}, {...}] analog: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 * }
 * @css {
var(--filter, none);
var(--display, block);
var(--width, unset);
var(--height, unset);
var(--overflow, initial);
var(--transition, none);
var(--margin, 0);
var(--transform, none);
var(--filter-hover, var(--filter, none));
var(--video-display, inline);
var(--video-width, 100%);
var(--video-min-width);
var(--video-max-width, 100%);
var(--video-height, auto);
var(--video-min-height, 100%);
var(--video-max-height);
var(--video-object-fit, cover);
var(--transition-mobile, none);
var(--transform-mobile, none);
var(--filter-mobile, none);
var(--width-mobile, 100%);
 * }
 */
export default class Video extends Shadow() {
  constructor (...args) {
    super(...args)
    this.sources = (this.getAttribute('sources') && Video.parseAttribute(this.getAttribute('sources'))) || null
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
    return !this.video
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
    :host {
      filter: var(--filter, none);
      display: var(--display, block);
      width: var(--width, unset);
      height: var(--height, unset);
      overflow: var(--overflow, initial);
      transition: var(--transition, none);
      margin: var(--margin, 0);
      transform: var(--transform, none);
    }
    :host:hover {
      filter: var(--filter-hover, var(--filter, none));
    }
    :host video, :host iframe {
      display: var(--video-display, inline);
      width: var(--video-width, 100%);
      min-width: var(--video-min-width);
      max-width: var(--video-max-width, 100%);
      height: var(--video-height, auto);
      min-height: var(--video-min-height, 100%);
      max-height: var(--video-max-height);
    }
    :host video, :host iframe {
      object-fit: var(--video-object-fit, cover);
    }

    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {
        transition: var(--transition-mobile, none);
        transform: var(--transform-mobile, none);
        filter: var(--filter-mobile, none);
        width: var(--width-mobile, 100%);
      }
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
    this.video = document.createElement('video')

    // in case someone adds sources directly instead of using the attributes
    Array.from(this.root.children).forEach(node => {
      if (node.nodeName === 'SOURCE') this.video.appendChild(node)
    })

    if (this.sources && this.sources.every(i => {
      if (i.src !== '' && i.type !== '') return this.video.innerHTML += `<source src="${i.src}" type="${i.type}">`
    })) this.html = this.video
  }
}
