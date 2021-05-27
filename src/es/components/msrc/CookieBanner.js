// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */

/**
 * CookieBanner https://react-components.migros.ch/?path=/docs/msrc-privacy-00-readme--page
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
 *    'webAPIKey': '5re...'
 *  }"]
 * }
 * @css {
 * --color, black
 * --font-size, 0.73rem
 * --line-height, normal
 * --font-weight, normal
 * --background-color, white
 * --box-shadow-color, white
 * --button-background-color, --color-secondary, orange
 * --button-border-color, --color-secondary, orange
 * --button-color, --background-color, white
 * --color-a, --color-secondary, white
 * }
 */
export default class CookieBanner extends Shadow() {
  constructor (...args) {
    super({ mode: 'false' }, ...args) // disabling shadow-DOM to have msrc styles flow into the node
  }

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
    const style = document.createElement('style')
    style.textContent = /* css */`
      #msrc-widget div, #msrc-widget a, #msrc-widget button {
        color: var(--color, black) !important;
        font-size: var(--font-size, 0.73rem) !important;
        font-family: var(--font-family) !important;
        line-height: var(--line-height, normal) !important;
        font-weight: var(--font-weight, normal) !important;
      }
      #msrc-widget > div {
        background-color: var(--background-color, white) !important;
        box-shadow: var(--box-shadow-color, white) 0px -3px 3px !important;
      }
      #msrc-widget button {
        background-color: var(--button-background-color, var(--color-secondary, var(--color, orange))) !important;
        border-color: var(--button-border-color, var(--color-secondary, var(--color, orange))) !important;
        color: var(--button-color, var(--background-color, white)) !important;
        font-family: var(--font-family-bold) !important;
      }
      #msrc-widget a {
        color: var(--a-color, var(--color-secondary, var(--color, white))) !important;
        text-decoration: var(--a-text-decoration, var(--text-decoration, underline)) !important;
        text-underline-offset: var(--a-text-underline-offset, 0.2em) !important;
      }
      #msrc-widget a:hover {
        color: var(--a-color-hover, var(--color-secondary-hover, var(--color-hover))) !important;
        text-decoration: var(--a-text-decoration-hover, var(--text-decoration-hover)) !important;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        #msrc-widget div, #msrc-widget a, #msrc-widget button {
          font-size: var(--font-size-mobile, var(--font-size, 0.73rem)) !important;
          line-height: var(--line-height-mobile, var(--line-height, normal)) !important;
          font-weight: var(--font-weight-mobile, var(--font-weight, normal)) !important;
          white-space: var(--white-space, normal) !important;
        }
        #msrc-widget > div {
          flex-direction: column !important;
          align-items: stretch !important;
        }
      }
      @media only screen and (max-width: 250px) {
        /* the cookie banner has never been adjusted for tiny sizes and looks shit, so better to hide it completely for smart watches, etc. */
        #msrc-widget {
          display: none;
        }
      }
    `
    const msrcCookieBanner = document.createElement('div')
    this.loadDependency().then(msrc => msrc.components.privacy.cookieBanner(msrcCookieBanner, this.constructor.parseAttribute(this.getAttribute('props'))))
    this.html = [style, msrcCookieBanner]
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
        vendorsMainScript.setAttribute('async', '')
        vendorsMainScript.setAttribute('src', '//cdn.migros.ch/msrc/20201012123840/vendors~main.js')
        vendorsMainScript.onload = () => {
          scriptCount++
          if ('msrc' in self === true && scriptCount >= 2) resolve(self.msrc) // eslint-disable-line
        }
        const mainScript = document.createElement('script')
        mainScript.setAttribute('type', 'text/javascript')
        mainScript.setAttribute('async', '')
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
