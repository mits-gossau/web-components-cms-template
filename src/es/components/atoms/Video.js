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
 *    type [string] e.g. image/jpg, image/webp, etc.
 *  }, {...}, {...}]
 *  {string} [title] title-text for the image
 * }
 * @css {
 *  --width [100%]
 *  --height [auto]
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
      :host video {
        display: var(--display, inline-block);
        width: var(--width, unset);
        height: var(--height, unset);
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    //this.html = this.video = document.createElement('video')
    this.html = this.video = document.createElement('div')

    // in case someone adds sources/img directly instead of using the attributes
    Array.from(this.root.children).forEach(node => {
      if (node.nodeName === 'SOURCE' || node.nodeName === 'IMG') this.video.appendChild(node)
    })

    if (this.sources) {
      this.sources.forEach(i => {
        //if (i.src !== '' && i.type !== '') this.video.innerHTML += `<source srcset="${i.src}" type="${i.type}">`
        if (i.src !== '' && i.type !== '') this.video.innerHTML += `<embed
          src="${i.src}"
          wmode="transparent"
          type="video/mp4"
          width="100%" height="100%"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
          title="${this.getAttribute('title')}"
        >`
      })
    }
  }
}
