// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Timeline use external js
 *
 * @attribute {
 *  {number + px} height
 *  {number + px} [mobile-breakpoint=1000px]
 *  {number} interval (autoplay is activated if this is set)
 *  ↓↓↓  TimelineJS attributes ↓↓↓
 *  https://github.com/NUKnightLab/TimelineJS3
 *  {number} [selected=0]
 *  {boolean} [loop=false]
 *  {boolean} [navigation=false]
 *  {boolean} [pagination=false]
 *  {boolean} [disable-drag=false]
 *  {number} [slides-per-view=1]
 *  {number} [slides-per-view-mobile=1]
 *  {boolean} [reduced-motion=false]
 *  {boolean} [auto-focus=false]
 *  {number} [sync-id=undefined] used to sync carousels on 'macro-carousel-selected-changed' only one of the synced elements is allowed to have an interval
 * }
 * @css {
 * --color, black
 * --font-size, 0.73rem
 * --background-color, white
 * }
 * @type {CustomElementConstructor}
 */
 export default class Timeline extends Shadow() {
  constructor (...args) {
    super(...args)

    this.timeline = document.createElement('timeline')
  }
  

  connectedCallback () {
    if (this.shouldComponentRenderHTML())  this.render()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
     shouldComponentRenderHTML () {
      return !this.scripts.length
    }


  /**
   * renders the html
   *
   * @return {void}
   */
  render () {
    //const timelineWrapper = document.createElement('div')

    this.loadDependency().then(() => {
      this.html = `<div data-source=${this.getAttribute('src')}></div>`
    })
    
  }

  /**
   * fetch dependency
   *
   * @returns {Promise<{components: any}>}
   */
   loadDependency () {

    // make it global to self so that other components can know when it has been loaded
    return this.dependencyPromise || (this.dependencyPromise = new Promise(resolve => {
        const timelineScript = document.createElement('script')
        timelineScript.setAttribute('type', 'text/javascript')
        timelineScript.setAttribute('async', '')
        timelineScript.setAttribute('src', '../thirdParty/Timeline.js')
        timelineScript.onload = () => resolve()
        this.html = timelineScript
      }
    ))
    
  }


  get scripts () {
    return this.root.querySelectorAll('script')
  }
 }