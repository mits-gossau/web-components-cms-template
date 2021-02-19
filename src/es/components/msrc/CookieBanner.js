// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * CookieBanner https://react-components.migros.ch/?path=/docs/msrc-privacy-00-readme--page (migros:bossNummer)
 * https://wiki.migros.net/display/SHAREDCOMP/CookieBanner+Einbindungs-Anleitung+React+SC
 * Example at: /src/es/components/pages/Home.html
 *
 * @export
 * @class CookieBanner
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [props="{
 *    'env': 'local|test|production',
 *    'language': 'de',
 *    'theme': 'mgb',
 *    'webAPIKey': '5reweDEbruthex8s'
 *  }"]
 * }
 */
export default class CookieBanner extends Shadow() {
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
    const msrcCookieBanner = document.createElement('div')
    this.loadDependency().then(msrc => msrc.components.privacy.cookieBanner(msrcCookieBanner, this.constructor.parseAttribute(this.getAttribute('props'))))
    this.html = msrcCookieBanner
  }

  /**
   * fetch dependency
   *
   * @returns {Promise<{components: any}>}
   */
  loadDependency () {
    return this.dependencyPromise || (this.dependencyPromise = new Promise(resolve => {
      // needs markdown
      if ('msrc' in self === true) {
        resolve(self.msrc) // eslint-disable-line
      } else {
        let scriptCount = 0
        const vendorsMainScript = document.createElement('script')
        vendorsMainScript.setAttribute('type', 'text/javascript')
        vendorsMainScript.setAttribute('src', '//cdn.migros.ch/msrc/20201012123840/vendors~main.js')
        vendorsMainScript.onload = () => {
          scriptCount++
          if ('msrc' in self === true && scriptCount >= 2) resolve(self.msrc) // eslint-disable-line
        }
        const mainScript = document.createElement('script')
        mainScript.setAttribute('type', 'text/javascript')
        mainScript.setAttribute('src', '//cdn.migros.ch/msrc/20201012123840/main.js')
        mainScript.onload = () => {
          scriptCount++
          if ('msrc' in self === true && scriptCount >= 2) resolve(self.msrc) // eslint-disable-line
        }
        this.html = [vendorsMainScript, mainScript]
      }
    }))
  }

  get scripts () {
    return this.root.querySelectorAll('script')
  }
}