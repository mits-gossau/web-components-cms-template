// @ts-check
import { Shadow } from '../prototypes/Shadow.js'

/* global self */
/* global MenuIcon */
/* global customElements */

/**
 * Header can be sticky and hosts as a flex mostly a logo and a navigation
 * Example at: /src/es/components/pages/Home.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Header
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: header;
 *  --position [sticky]
 *  --z-index [100]
 *  --align-items [center]
 *  --background-color [black]
 *  --height  [85px]
 *  --justify-content  [space-between]
 *  --justify-content-mobile [space-between]
 *  --content-spacing [40px]
 *  --flex-direction  [row]
 *  --flex-direction-mobile [row-reverse]
 *  --height-mobile [50px]
 *  --text-align [initial]
 *  --padding [calc...]
 * }
 * @attribute {
 *  {boolean} [show]
 *  {string} mobile-breakpoint
 *  {boolean} [menu-icon=false]
 *  {string} [no-scroll="no-scroll"]
 *  {has} [flyer-transitionend=n.a.] trigger the animate class animations and early set children to no-scroll aka. open
 * }
 */
export default class Header extends Shadow() {
  constructor (...args) {
    super(...args)

    this.transitionendListener = event => {
      if (!this.header.classList.contains('open')) {
        this.header.classList.add('animate')
        if (this.header) {
          Array.from(this.header.children).forEach(node => {
            node.classList.add(this.getAttribute('no-scroll') || 'no-scroll')
          })
        }
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    if (this.hasAttribute('flyer-transitionend')) document.body.addEventListener(this.getAttribute('flyer-transitionend') || 'flyer-transitionend', this.transitionendListener, { once: true })
  }

  disconnectedCallback () {
    if (this.hasAttribute('flyer-transitionend')) document.body.removeEventListener(this.getAttribute('flyer-transitionend') || 'flyer-transitionend', this.transitionendListener)
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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('header')
  }

  /**
   * renders the o-header css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        grid-area: header;
        position: var(--position, sticky);
        top: 0;
        z-index: var(--z-index, 100);
        text-align: var(--text-align, initial);
      }
      :host > * {
        margin: var(--content-spacing, 40px) auto;  /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        width: var(--content-width, 80%);
      }
      :host > span, :host > div, :host > p, :host > ul, :host > ol {
        width: var(--content-width-not-web-component, 80%);
      }
      :host > header {
        align-items: var(--align-items, center);
        background-color: var(--background-color, black);
        display: flex;
        flex-direction: var(--flex-direction , row);
        height: var(--height , 85px);
        justify-content: var(--justify-content , space-between);
        padding: var(--padding, 0 calc(var(--content-spacing, 40px) / 2));
        transition: var(--transition, all 0.2s ease);
      }
      :host > header.open {
        background-color: var(--background-color-open, var(--background-color, black));
      }
      :host > header.animate {
        background: linear-gradient(to bottom, var(--background-color-open) 0%, var(--background-color-open) 50%, var(--background-color) 50%, var(--background-color) 100%);
        animation: backgroundAnimation var(--background-animation, 0.5s ease);
        background-size: 100% 200%;
        background-position-y: 0%;
      }
      :host > header.animate > a-menu-icon {
        --a-menu-icon-background-color: var(--background-color, #777);
      }
      :host > header > a {
        color: var(--a-color, var(--color));
        font-family: var(--a-font-family, var(--font-family));
        font-weight: var(--a-font-weight, var(--font-weight, normal));
        font-size: var(--a-font-size, var(--font-size));
        padding: var(--a-padding, 0);
        line-height: var(--a-line-height, 0);
        order: 1;
        text-decoration: var(--a-text-decoration, var(--text-decoration, none));
        text-underline-offset: var(--a-text-underline-offset, unset);
        text-transform: var(--a-text-transform, uppercase);
        transition: var(--a-transition, all 0.2s ease);
      }
      :host > header > a:hover {
        color: var(--a-color-hover, var(--a-color-hover, var(--a-color, var(--color))));
        text-decoration: var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none))));
      }
      :host > header.open > a {
        font-size: var(--a-font-size-open, var(--font-size-open, var(--a-font-size, var(--font-size))));
      }
      :host > header > a-menu-icon {
        display: none;
        --a-menu-icon-background-color: var(--color, #777);
      }
      @keyframes backgroundAnimation {
        0%{background-position-y:100%}
        100%{background-position-y:0%}
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > * {
          margin: var(--content-spacing-mobile, 0) auto; /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
          width: var(--content-width-mobile, 90%);
        }
        :host > span, :host > div, :host > p, :host > ul, :host > ol {
          width: var(--content-width-not-web-component-mobile, 90%);
        }
        :host > header {
          height: var(--height-mobile, 50px);
          flex-direction: var(--flex-direction-mobile, row-reverse);
          justify-content: var(--justify-content-mobile, space-between);
        }
        :host > header > m-navigation {
          display: var(--m-navigation-display-mobile, none);
          left: 0;
          height: var(--m-navigation-height-mobile, 0);
          overflow: hidden;
          position: var(--m-navigation-position-mobile, absolute);
          transition: var(--m-navigation-transition, all 0.2s ease);
          top: var(--height-mobile, 50px);
          width: 100%;
        }
        :host > header.open > m-navigation{
          display: var(--m-navigation-display-open-mobile, var(--m-navigation-display-mobile, block));
          height: var(--m-navigation-height-open-mobile, 100vh);
          overflow-y: var(--m-navigation-overflow-y-open-mobile, auto);
        }
        :host  > header > a-menu-icon{
          display: var(--a-menu-icon-display-mobile, block);
        }
        :host  > header.open > a-menu-icon{
          --a-menu-icon-height: var(--a-menu-icon-height-open-mobile);
          --a-menu-icon-margin: var(--a-menu-icon-margin-open-mobile);
          display: var(--a-menu-icon-display-open-mobile, var(--a-menu-icon-display-mobile, block));
        }
        :host > header > a-logo{
          flex-grow: 1;
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
    this.header = this.root.appendChild(document.createElement('header'))
    Array.from(this.root.children).forEach(node => {
      if (node === this.header || node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.header.appendChild(node)
    })
    if (this.getAttribute('menu-icon')) {
      this.loadChildComponents().then(children => {
        const MenuIcon = new children[0][1]({ namespace: this.getAttribute('namespace') ? `${this.getAttribute('namespace')}a-menu-icon-` : '' })
        MenuIcon.addEventListener('click', event => {
          this.header.classList.toggle('open')
          const prop = this.header.classList.contains('open') ? 'add' : 'remove'
          document.body.classList[prop](this.getAttribute('no-scroll') || 'no-scroll')
          Array.from(this.header.children).forEach(node => {
            node.classList[prop](this.getAttribute('no-scroll') || 'no-scroll')
          })
        })
        this.header.appendChild(MenuIcon)
      })
    }
    self.addEventListener('resize', event => document.body.classList.remove(this.getAttribute('no-scroll') || 'no-scroll'))
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents () {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let menuIconPromise
    try {
      menuIconPromise = Promise.resolve({ default: MenuIcon })
    } catch (error) {
      menuIconPromise = import('../atoms/MenuIcon.js')
    }
    return (this.childComponentsPromise = Promise.all([
      menuIconPromise.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-menu-icon', module.default]
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
