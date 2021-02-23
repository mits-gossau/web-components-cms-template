// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * Example at: /src/es/components/pages/Home.html
 *
 * @export
 * @class GTM
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} id
 * }
 */
export default class GTM extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderHTML()) this.render()
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
    const script = document.createElement('script')
    script.textContent =  /* html */`
      window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
      ga('create', '${this.getAttribute('id')}', 'auto');
      ga('send', 'pageview');
    `
    this.html = script
    this.loadDependency()
  }

  /**
   * fetch dependency
   *
   * @returns {Promise<{components: any}>}
   */
  loadDependency () {
    return this.dependencyPromise || (this.dependencyPromise = new Promise(resolve => {
      const gtmScript = document.createElement('script')
      gtmScript.setAttribute('type', 'text/javascript')
      gtmScript.setAttribute('src', 'https://www.google-analytics.com/analytics.js')
      gtmScript.onload = () => {
        resolve()
      }
      this.html = gtmScript
    }))
  }

  get scripts () {
    return this.root.querySelectorAll('script')
  }
}