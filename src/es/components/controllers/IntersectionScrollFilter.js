// @ts-check
import { Intersection } from '../prototypes/Intersection.js'

/* global HTMLElement */

/**
* IntersectionScrollFilter 
* Applies a CSS-Filter to the direct children of itself. The type of filter can be defined through an attribute.
* The Output-Value is between 0 and 1 depending on the scroll position of the element.
* Default Behaviour: The CSS-Filter will be applied at 100% at the edges of the viewport and will increase/decrease while nearing the center,
* where the filter will be applied at 0%. This behaviour can be inverted by setting the invert attribute to "true"
*
* Possible FUTURE improvement calc into web workers> https://github.com/mits-gossau/web-components/blob/master/src/es/helpers/WebWorker.js
*
* @export
* @class IntersectionScrollFilter
* @type {CustomElementConstructor}
* @attribute {
  *  {string} [filter] css filter name
  *  {string} [max-value] the maximum value of the set filter e.g. "100%" (including the unit)
  *  {string} [invert] if set to "true" the filter will be applied inverted (default is: 0% filter in the center of the viewport, 100% filter at the edges)
  * }
  * 
  * TODO: mobile/desktop attribute [mobile, desktop, both]
  *   effect transform... or even others
  *   rename component
  *   test old browsers
  *   look at possible use case min-value
  *   --filter-mobile var name dynamic filter... transform see above
  *   rounding not always working
  */
  export default class IntersectionScrollFilter extends Intersection() {
    constructor (options = {}, ...args) {
      super(Object.assign(options, {mode: 'false', intersectionObserverInit: {rootMargin: "0px 0px 0px 0px"} }), ...args)
      
      /** @type {number} */
      this.windowInnerHeight
      /** @type {number} */
      this.elementHeight
      /** @type {number} */
      this.center
      /** @type {number} */
      this.maxDistanceFromCenter
      
      this.scrollListener = event => {
        const boundingRect = this.getBoundingClientRect()
        if (!this.windowInnerHeight) this.windowInnerHeight = self.innerHeight
        if (!this.elementHeight) this.elementHeight = this.round(boundingRect.height, 2)
        if (!this.center) this.center = this.round(this.windowInnerHeight / 2 - this.elementHeight / 2, 2)
        if (!this.maxDistanceFromCenter) this.maxDistanceFromCenter = this.windowInnerHeight - this.center
        
        const difference = this.round(this.center > boundingRect.top 
          ? this.center - boundingRect.top 
          : boundingRect.top - this.center
        , 2)
          
        let outputValue = this.round(difference / this.maxDistanceFromCenter, 2)
        
        outputValue = this.clamp(outputValue, 0, 1) // clamp value to avoid inaccuracies from scrolling too fast
        outputValue = this.getAttribute("invert") === "true" ? 1 - outputValue : outputValue
        if (this.getAttribute("filter") && this.getAttribute("max-value")) {
          console.log('changed', outputValue);
          this.css = ''
          this.css = /* css */ `
          :host {
            --filter-mobile: ${this.getAttribute("filter")}(calc(${outputValue} * ${this.getAttribute("max-value")}))
          }
          `
        }
      }
     }

     connectedCallback () {
       //@ts-ignore ignoring self.Environment error
      if (window.matchMedia(`(max-width: ${self.Environment.mobileBreakpoint}`).matches) super.connectedCallback()
     }

     disconnectedCallback () {
       //@ts-ignore ignoring self.Environment error
        if (window.matchMedia(`(max-width: ${self.Environment.mobileBreakpoint}`).matches) super.disconnectedCallback()
     }
      
      /**
      * rounds number to set amount of decimals (>= 1)
      * @param {number} value 
      * @param {number} decimalsAmount
      */
      round(value, decimalsAmount) {
        decimalsAmount = decimalsAmount < 1 ? 1 : decimalsAmount
        return Math.round((value + Number.EPSILON) * (10 * decimalsAmount)) / (10 * decimalsAmount) 
      }
      
      /**
      * clamps number between min & max value
      * @param {number} value 
      * @param {number} min 
      * @param {number} max
      */
      clamp(value, min, max) {
        return Math.min(Math.max(value, min), max)
      }
      
      /**
      * callback from the Intersection Observer
      *
      * @return {void}
      */
      intersectionCallback (entries, observer) {
        if (entries && entries[0]) {
          if (entries[0].isIntersecting) {
            self.addEventListener("scroll", this.scrollListener)
          } else {
            self.removeEventListener("scroll", this.scrollListener)
          }
        }
      }
    }