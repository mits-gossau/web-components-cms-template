// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global HTMLElement */

/**
 * As a molecule, this component shall hold Atoms
 *
 * @export
 * @class Navigation
 * @type {CustomElementConstructor}
 */
export default class Navigation extends Shadow() {
  constructor () {
    super()

    this.nav = document.createElement('nav')
    this.nav.hidden = true
    Array.from(this.root.children).forEach(node => {
      if (!node.getAttribute('slot')) this.nav.appendChild(node)
    })
    this.root.appendChild(this.nav)
  }

  connectedCallback () {
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

  /**
   * renders the m-navigation css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host{
        color: black;
        --padding: calc(var(--content-margin) / 2);
      }
      :host a-link {
        --padding: 14px 10px;
      }
      :host ul{
        background-color: var(--bg-color);
        list-style: none;
        margin: 0;
        padding: 0;
      }
      :host > nav > ul{
        align-items: center;
        display: flex;
        padding: var(--padding) 0;
      }
      :host > nav > ul > li{
        display: block;
        padding: 0 10px;
      }
      :host > nav > ul li{
        position: relative;
      }
      :host > nav > ul li > a-arrow {
        display: none;
        visibility: hidden;
      }
      :host > nav > ul li ul{
        display: none;
        padding-top: calc(var(--padding) - 1px);
        position: absolute;
        width: max-content;
      }
      :host > nav > ul li:last-child ul{
        right: 0;
      }
      :host > nav > ul li:hover{
        cursor: pointer;
      }
      ${this.getAttribute('hover') === 'true' && 
        `:host > nav > ul li:hover ul,
        :host > nav > ul li ul:hover,` || ''}
      :host > nav > ul li:focus-within ul{
        display: block;
      }
      :host > nav > ul li ul li {
        min-width: 100px;
      }
      :host > nav > ul > li > ul > li:first-child{
        padding-top: 6px;
        border-top: 1px solid var(--font-color);
      }
      @media only screen and (max-width: 1000px) {
        :host {
          --font-size: 2rem;
          --font-weight: 600;
          --text-align: center;
        }
        :host > nav > ul{
          flex-direction: column;
          padding: 0;
        }
        :host > nav > ul li{
          border-top: 1px solid var(--font-color);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 0;
          width: 100%;
        }
        :host > nav > ul li.open > a-link, :host > nav > ul li.open > a-arrow{
          --font-color: var(--font-color-hover);
        }
        :host > nav > ul li > a-link{
          flex-grow: 1;
        }
        :host > nav > ul > li:not(.no-arrow) > a-arrow {
          visibility: visible;
        }
        :host > nav > ul > li a-arrow {
          display: block;
          min-height: 50px;
          min-width: 50px;
        }
        :host > nav > ul li ul{
          --font-weight: 300;
          padding: 0;
          position: unset;
          width: 100%;
        }
        :host > nav > ul li:hover ul,
        :host > nav > ul li:focus-within ul,
        :host > nav > ul li ul:hover{
          display: none;
        }
        :host > nav > ul li.open ul{
          display: block;
        }
        :host > nav > ul > li > ul li {
          flex-wrap: unset;
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    this.loadChildComponents().then(children => Array.from(this.root.querySelectorAll('a')).forEach(a => {
      const li = a.parentElement
      if (!li.querySelector('ul')) li.classList.add('no-arrow')
      const aLink = new children[0][1]()
      aLink.setAttribute('href', a.getAttribute('href'))
      aLink.setAttribute('text-transform', 'uppercase')
      aLink.textContent = a.textContent
      const arrow = new children[1][1]()
      arrow.setAttribute('direction', 'down')
      const arrowClickListener = event => {
        li.classList.toggle('open')
        arrow.setAttribute('direction', li.classList.contains('open') ? 'up' : 'down')
      }
      arrow.addEventListener('click', arrowClickListener)
      aLink.addEventListener('click', event => {
        if (event.target && (!event.target.href || event.target.href === '#')) {
          event.preventDefault()
          arrowClickListener()
        }
      })
      li.prepend(arrow)
      a.replaceWith(aLink)
      li.prepend(aLink)
      this.nav.hidden = false
    }))
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    return this.childComponentsPromise || (this.childComponentsPromise = Promise.all([
      import('../atoms/Link.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-link', module.default]
      ),
      import('../atoms/Arrow.js').then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-arrow', module.default]
      )
    ]).then(elements => {
      elements.forEach(element => {
        // don't define already existing customElements
        // @ts-ignore
        if (!customElements.get(element[0])) customElements.define(...element)
      })
      return elements
    }))
  }
}