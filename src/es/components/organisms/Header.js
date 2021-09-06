
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
      :host {
        color: black;
        
      }
      :host * {
        width: var(--width);
      }
      :host > header {
        padding-left: var(--padding-left);
        display: var(--display);
        grid-template-rows: var(--grid-template-rows);
        grid-template-columns: var(--grid-template-columns);
        height: var(--height);
      }
      :host > header > * {
        grid-row: 2;
        float: left;
      }
      :host .accent {
        grid-row: 3;
        grid-column: 1 / 3;
        width: var(--accent-width);
        height: var(--accent-height);
        background: var(--accent-background);
      }
      :host .topNav {
        display: inline-grid;
        grid-row: 1;
        grid-column: 2;
        display: var(--topNav-display);
        height: var(--topNav-height);
        text-align: right;
      }
      :host .topNav > ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin-top: 5px;;
      }
      :host .topNav > ul:last-child {
        width: var(--topNav-lastChild-width);
        padding-right: var(--topNav-lastChild-padding-right);
      }
      :host .topNav > ul > li {
        display: inline;
        padding-right: var(--topNav-ul-li-padding);
      }
      :host .topNav > .language-switcher > li {
        padding: var(--topNav-language-padding);
      }
      :host .topNav > ul > li > a, span {
        color: var(--topNav-color);
        text-decoration: none;
        font-family: 'Roboto', sans-serif;
        font-size: 13px;
      }
      :host .topNav > ul > li > a:hover {
        color: #ff0000;
        text-decoration: none;
      }

      :host > header > a-logo {
        display: inline-block;
        width: var(--alogo-width);
        margin: var(--alogo-margin);
        margin-bottom: var(--alogo-margin-bottom);
      }
      `;
  }

  renderHTML () {
    this.header = document.createElement('header')
    var newdiv = document.createElement('div')
    newdiv.className = 'topNav'
    this.div = this.header.appendChild(newdiv)
    Array.from(this.root.children).forEach(node => {
      if (node.localName === 'ul') {
        this.div.appendChild(node)
        if (node.className === "language-switcher"){
          var languages = node
          Array.from(node.children).forEach(lan => {
            languages.appendChild(lan)
            var spacer = document.createElement('span')
            spacer.innerHTML = '|'
            languages.appendChild(spacer)
          })
          languages.lastElementChild.remove();
        }
      }
      else if (node === this.header || node.getAttribute('slot') || node.nodeName === 'STYLE')
        return false
      else
        this.header.appendChild(node)
    })
    var accentDiv = document.createElement('div')
    accentDiv.className = 'accent'
    this.header.appendChild(accentDiv)
    this.root.appendChild(this.header)
  }
}
