// @ts-check

/* global IntersectionObserver */

import { Shadow } from './Shadow.js'

/**
 * IntersectionObserver is a helper which sets up a new IntersectionObserver in the context of a web component
 * NOTE: IntersectionObserver comes with event queues, which use can be overwritten by intersectionCallback if not needed. A full queue web component would make sense with ES6 Proxies aka. Proxify.js to queue not only events but any attribute and function.
 *
 * @export
 * @function IntersectionObserver
 * @param {Function | *} ChosenClass
 * @attribute {'string'} [intersectionObserverInit=`{
      'root': undefined
      'rootMargin': '200px 0px 200px 0px',
      'threshold': 0
    }`]
 * @requires {
      Shadow: {
        connectedCallback,
        disconnectedCallback,
        parseAttribute
      }
    }
 * @property {
      intersectionCallback,
      intersectionObserveStart,
      intersectionObserveStop
    }
 * @return {CustomElementConstructor | *}
 */
export const Intersection = (ChosenClass = Shadow()) => class Intersection extends ChosenClass {
  /**
   * Creates an instance of IntersectionObserver. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {{intersectionObserverInit: IntersectionObserverInit | undefined}} [options = {intersectionObserverInit: undefined}]
   * @param {*} args
   */
  constructor (options = { intersectionObserverInit: undefined }, ...args) {
    super(options, ...args)

    /**
     * Digest attribute to have IntersectionObservers or not
     * this will trigger this.intersectionCallback and can be extended
     * see => https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver Properties
     *
     * @type {IntersectionObserverInit}
     */
    let intersectionObserverInit = typeof options.intersectionObserverInit === 'object' ? options.intersectionObserverInit : Intersection.parseAttribute(this.getAttribute('intersectionObserverInit'))
    if (intersectionObserverInit) {
      // add default IntersectionObserverInit Props
      intersectionObserverInit = Object.assign({
        root: undefined,
        rootMargin: '200px 0px 200px 0px',
        threshold: 0
      }, intersectionObserverInit)
      /** @type {IntersectionObserver} */
      const intersectionObserver = new IntersectionObserver(this.intersectionCallback.bind(this), intersectionObserverInit)
      /** @return {void} */
      this.intersectionObserveStart = () => {
        // @ts-ignore
        intersectionObserver.observe(this)
      }
      /** @return {void} */
      this.intersectionObserveStop = () => intersectionObserver.disconnect()
    } else {
      /** @return {void} */
      this.intersectionObserveStart = () => {}
      /** @return {void} */
      this.intersectionObserveStop = () => {}
      console.warn('IntersectionObserver got not started, due to missing options.intersectionObserverInit. At least supply an empty object to activate the observer with the default settings!')
    }
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   *
   * @return {void}
   */
  connectedCallback () {
    super.connectedCallback()
    this.intersectionObserveStart()
  }

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   *
   * @return {void}
   */
  disconnectedCallback () {
    super.disconnectedCallback()
    this.intersectionObserveStop()
  }

  /**
   * observes intersection with its intersectionObserverInit.root (dom viewport)
   *
   * @param {IntersectionObserverEntry[]} entries
   * @param {IntersectionObserver} observer
   * @return {void}
   */
  intersectionCallback (entries, observer) {}
}
