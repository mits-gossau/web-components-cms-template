
import Header from '../web-components-cms-template/src/es/components/organisms/Header.js'

export default class MIndustryHeader extends Header {
  constructor (...args) {
    super(...args);
  }

  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    this.renderHTML()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
   shouldComponentRenderCSS () {
    return !this.root.querySelector('style[_css]')
  }

  renderCSS() {
    super.renderCSS()
      this.css = /* css */`
      
      `;
    
  }

  renderHTML () {

  }

  

}
