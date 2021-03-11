// @ts-check
import { Intersection } from '../prototypes/Intersection.js'

/* global HTMLElement */

/**
* IntersectionScrollEffect 
* This component can be used to apply a CSS-Effect to its children based on scroll-position. The type of effect can be defined through attributes.
* Examples: 
*   <o-intersection-scroll-effect css-property=filter, effect=brightness, max-value=100%>
*   <o-intersection-scroll-effect css-property=--transform-mobile, effect=translateX, max-value=50px>
*
* NOTE: When using a CSS-Variable for the css-property, the component where the effect should be applied needs to have a line where the CSS-variable gets used
* => e.g.: filter: var(--filter-mobile, none)
*
* NOTE: Use Css variables for certain values in combination with child web components, since not every css property will propagate to its child web component. eg. transform (filter seems to work though)
* 
* The CSS-Effect will be applied at 100% at the edges of the viewport and will increase/decrease while nearing the center,
* at which the effect will be applied at 0%. This behaviour can be inverted by setting the invert attribute to "true"
*
* Possible FUTURE improvement calc into web workers -> https://github.com/mits-gossau/web-components/blob/master/src/es/helpers/WebWorker.js
*
* @export
* @class IntersectionScrollEffect
* @type {CustomElementConstructor}
* @attribute {
  *  {string} [css-property] the name of the css-property (can be a CSS-Variable)
  *  {mobile, desktop} [media=both desktop & mobile] defining when effect should be applied
  *  {string} [mobile-breakpoint=self.Environment.mobileBreakpoint] define custom mobile-breakpoint
  *  {string} [max-value] the maximum value of the set effect e.g. "100%" (including the unit)
  *  {string} [invert] if set to "true" the filter will be applied inverted (default is: 0% filter in the center of the viewport, 100% filter at the edges)
  *  {string} [transition] set if the effect shall have a transition e.g. "0.2s ease"
  * }
  */
  export default class IntersectionScrollEffect extends Intersection() {
    constructor (options = {}, ...args) {
      super(Object.assign(options, {mode: "open", intersectionObserverInit: {rootMargin: "0px 0px 0px 0px"} }), ...args)
      
      /** @type {number} */
      this.elementHeight
      /** @type {number} */
      this.center
      /** @type {number} */
      this.maxDistanceFromCenter
      /** @type {boolean} */
      this.isFirstIntersection = true
      /** @type {boolean} */
      this.hasRequiredAttributes = this.getAttribute("css-property") && this.getAttribute("effect") && this.getAttribute("max-value")

      this.html = /* HTML */`
        <style _css="" protected="true">
          :host {
            display: block; /* fix: google chrome wrong measurements */
          }
          ${this.getAttribute("transition") && this.getAttribute("css-property") && !this.getAttribute("css-property").includes('--') ? /* CSS */`:host > * {
            transition: ${this.getAttribute("css-property")} ${this.getAttribute("transition")};
          }` : ''}
        </style>
      `
      
      this.scrollListener = event => {
        const boundingRect = this.getBoundingClientRect()
        const recalculate = this.elementHeight !== boundingRect.height

        // saving measurements in variables to avoid redundant calculations
        if (!this.elementHeight || recalculate) this.elementHeight = this.round(boundingRect.height, 2)
        if (!this.center || recalculate) this.center = this.round(self.innerHeight / 2 - this.elementHeight / 2, 2)
        if (!this.maxDistanceFromCenter || recalculate) this.maxDistanceFromCenter = self.innerHeight - this.center
        
        //TODO wrong boundingRect.height onload
        //TODO add optional min-value? max(minValue, outputValue * maxValue)

        // get distance from center (abs)
        const difference = this.round(this.center > boundingRect.top ? this.center - boundingRect.top : boundingRect.top - this.center, 2)
        // get output [0..1]
        let outputValue = this.round(difference / this.maxDistanceFromCenter, 4)
        // clamp value to avoid inaccuracies from scrolling too fast
        outputValue = this.clamp(outputValue, 0, 1)
        // invert effect behaviour in relation to scroll-position (define where 0% and 100% are)
        outputValue = this.getAttribute("invert") === "true" ? 1 - outputValue : outputValue

        if (!isNaN(outputValue)) {
          this.css = "" // resets css
          this.css = /* css */ `
            :host > * {
              ${this.getAttribute("css-property")}: ${this.getAttribute("effect")}(calc(${outputValue} * ${this.getAttribute("max-value")}));
            }
          `
        }
      }

      this.resizeListener = event => {
        if (this.hasRequiredAttributes) {
          if (this.checkMedia()) {
            this.intersectionObserveStart()
          } else {
            this.intersectionObserveStop()
            self.removeEventListener("scroll", this.scrollListener)
            this.css = "" // resets css
            this.isFirstIntersection = true
          }
        }
      }
     }

    checkMedia () {
      //@ts-ignore ignoring self.Environment error
      const breakpoint = this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'
      switch(this.getAttribute("media")) {
        case "mobile": return self.matchMedia(`(max-width: ${breakpoint})`).matches
        case "desktop": return self.matchMedia(`(min-width: calc(${breakpoint} + 1px))`).matches
        default: return true
      }
    }

    connectedCallback () {
        if (this.hasRequiredAttributes) {
          if (this.checkMedia()) super.connectedCallback() // this.intersectionObserveStart()
          self.addEventListener('resize', this.resizeListener);
        }
    }

     disconnectedCallback () {
      if (this.hasRequiredAttributes) {
        if (this.checkMedia()) {
          super.disconnectedCallback() // this.intersectionObserveStop()
          self.removeEventListener("scroll", this.scrollListener)
          this.css = "" // resets css
          this.isFirstIntersection = true
        }
        self.removeEventListener('resize', this.resizeListener);
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
            if (this.isFirstIntersection) {
              this.scrollListener()
              setTimeout(() => this.scrollListener(), 100);
              this.isFirstIntersection = false
            }
            self.addEventListener("scroll", this.scrollListener)
          } else {
            self.removeEventListener("scroll", this.scrollListener)
          }
        }
      }
    }