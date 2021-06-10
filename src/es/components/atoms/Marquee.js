// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/**
 * Sample is an icon
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Sample
 * @type {CustomElementConstructor}
 * @attribute {

 * }
 * @css {

 * }
 */
export default class Marquee extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host > * {
        animation:marquee 10s linear infinite;
      }
      @keyframes marquee{
        from{
          transform:translateX(101%);
        }
        to{
          transform:translateX(-101%)
        }
      }
    `
  }
}
