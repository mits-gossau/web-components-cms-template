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
 * @export
 * @class IntersectionScrollFilter
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [filter] css filter name
 *  {string} [maxValue] the maximum value of the set filter e.g. "100%" (including the unit)
 *  {string} [invert] if set to "true" the filter will be applied inverted (default is: 0% filter in the center of the viewport, 100% filter at the edges)
 * }
 */
export default class IntersectionScrollFilter extends Intersection() {
    /** @type {number} */
    windowInnerHeight
    /** @type {number} */
    elementHeight
    /** @type {number} */
    center
    /** @type {number} */
    maxDistanceFromCenter
 
    constructor (options = {}, ...args) {
    super(Object.assign(options, {intersectionObserverInit: {rootMargin: "0px 0px 0px 0px"} }), ...args)
    this.scrollListener = event => {
        const boundingRect = this.getBoundingClientRect()
        if (!this.windowInnerHeight) this.windowInnerHeight = self.innerHeight
        if (!this.elementHeight) this.elementHeight = this.round(boundingRect.height, 2)
        if (!this.center) this.center = this.round(this.windowInnerHeight / 2 - this.elementHeight / 2, 2)
        if (!this.maxDistanceFromCenter) this.maxDistanceFromCenter = this.windowInnerHeight - this.center

        const difference = 
            this.round(
                this.center > boundingRect.top 
                    ? this.center - boundingRect.top 
                    : boundingRect.top - this.center
                , 2)
                
        let outputValue = this.round(difference / this.maxDistanceFromCenter, 2)

        outputValue = this.clamp(outputValue, 0, 1) // clamp value to avoid inaccuracies from scrolling too fast
        outputValue = this.getAttribute("invert") === "true" ? 1 - outputValue : outputValue
        if (this.getAttribute("filter") && this.getAttribute("maxValue")) {
        this.css = /* css */ `
            :host > * {
                filter: ${this.getAttribute("filter")}(calc(${outputValue} * ${this.getAttribute("maxValue")}))
            }
        `
        }
    }
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
    // return 1.1 & -0.1 clamp 0 and 1
    return Math.min(Math.max(value, min), max)
  }

  /**
   * callback from the Intersection Observer
   *
   * @return {void}
   */
  intersectionCallback (entries, observer) {
    //@ts-ignore ignoring self.Environment error
    if (window.matchMedia(`(max-width: ${self.Environment.mobileBreakpoint}`).matches) {
        if (entries && entries[0]) {
            if (entries[0].isIntersecting) {
                self.addEventListener("scroll", this.scrollListener)
            } else {
                self.removeEventListener("scroll", this.scrollListener)
            }
          }
      }
    }
}