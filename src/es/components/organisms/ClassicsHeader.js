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
 *  {has} [sticky] make header sticky
 *  {boolean} [has-background-img]
 * }
 */
export default class ClassicsHeader extends Shadow() {
  constructor(...args) {
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

    this.scrollListener = event => {
      const lastScroll = self.scrollY
      setTimeout(() => {
        // is top
        if (self.scrollY <= this.offsetHeight + 5) {
          this.classList.add('top')
          // is scrolled down
        } else {
          this.classList.remove('top')
          // scrolling up and show header
          if ((Math.abs(self.scrollY - lastScroll) > 30 && self.scrollY <= lastScroll)) {
            this.classList.add('show')
            // scrolling down and hide header
          } else if (Math.abs(self.scrollY - lastScroll) > 30) {
            if (this.mNavigation) Array.from(this.mNavigation.root.querySelectorAll('.open')).forEach(node => node.classList.remove('open'))
            this.classList.remove('show')
          }
        }
        self.addEventListener('scroll', this.scrollListener, { once: true })
      }, 200)
    }
  }

  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    if (this.hasAttribute('flyer-transitionend')) document.body.addEventListener(this.getAttribute('flyer-transitionend') || 'flyer-transitionend', this.transitionendListener, { once: true })
    if (this.hasAttribute('sticky')) self.addEventListener('scroll', this.scrollListener, { once: true })

    setTimeout(() => {
      this.root.querySelector('header').querySelector('m-navigation').style.opacity = 1
    }, 1000);
  }

  disconnectedCallback() {
    if (this.hasAttribute('flyer-transitionend')) document.body.removeEventListener(this.getAttribute('flyer-transitionend') || 'flyer-transitionend', this.transitionendListener)
    if (this.hasAttribute('sticky')) self.removeEventListener('scroll', this.scrollListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML() {
    return !this.root.querySelector('header')
  }

  /**
   * renders the o-header css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */`
      :host {
        grid-area: header;
        position: var(--position, sticky);
        top: 0;
        z-index: var(--z-index, 100);
        text-align: var(--text-align, initial);
        background-color: var(--background-color, transparent);
        --header-position: relative;
      }
      :host > * {
        font-size: var(--font-size, 1rem);
        margin: var(--content-spacing, 40px) auto;  /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        width: var(--content-width, 80%);
      }
      :host > span, :host > div, :host > p, :host > ul, :host > ol {
        width: var(--content-width-not-web-component, 80%);
      }
      :host > header {
        align-items: var(--align-items, center);
        background-color: var(--background-color, black);
        border: var(--border, 0);
        border-bottom: var(--border-bottom, 0);
        display: flex;
        flex-direction: var(--flex-direction , row);
        flex-wrap: var(--flex-wrap, nowrap);
        height: var(--height , 85px);
        justify-content: var(--justify-content , space-between);
        padding: var(--padding, 0 calc(var(--content-spacing, 40px) / 2));
        position: var(--header-position, static);
        transition: var(--transition, all 0.2s ease);
      }
      :host > header.open {
        background-color: var(--background-color-open, var(--background-color, black));
      }
      :host > header.open::after {
        animation: fadeIn 0.25s forwards 0.25s ease-in-out;
        position: fixed;
        z-index: 6;
        content:'';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
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
      :host > header > a-title {
        --title-width: 60%;
        --title-width-mobile: 80%;
        z-index: var(--a-title-z-index, auto);
      }
      :host > header > a {
        align-self: var(--a-align-self, var(--align-self, auto));
        color: var(--a-color, var(--color));
        font-family: var(--a-font-family, var(--font-family));
        font-weight: var(--a-font-weight, var(--font-weight, normal));
        font-size: var(--a-font-size, var(--font-size));
        padding: var(--a-padding, 0);
        margin: var(--a-margin, 0);
        line-height: var(--a-line-height, 0);
        order: var(--order, 1);
        text-decoration: var(--a-text-decoration, var(--text-decoration, none));
        text-underline-offset: var(--a-text-underline-offset, unset);
        text-transform: var(--a-text-transform, uppercase);
        transition: var(--a-transition, all 0.2s ease);
        white-space: var(--a-white-space, normal);
      }
      :host > header > a:hover {
        color: var(--a-color-hover, var(--a-color-hover, var(--a-color, var(--color))));
        text-decoration: var(--a-text-decoration-hover, var(--text-decoration-hover, var(--a-text-decoration, var(--text-decoration, none))));
      }
      :host > header.open > a {
        font-size: var(--a-font-size-open, var(--font-size-open, var(--a-font-size, var(--font-size))));
      }
      :host > header > a-menu-icon {
        align-self: var(--a-menu-icon-align-self, var(--align-self, auto));
        display: none;
        --a-menu-icon-background-color: var(--color, #777);
      }
      /* sticky header classes */
      :host([sticky]) {
        position: sticky;
      }
      :host([sticky].top) {
        position: var(--position, sticky);
        top: -${this.offsetHeight}px;
      }
      :host([sticky].top), :host([sticky].top) > header {
        background-color: transparent;
      }
      :host([sticky].show:not(.top)) {
        border-bottom: var(--sticky-border-bottom, 1px solid var(--color));
        top: 0;
        transition: var(--sticky-transition-show, top .5s ease);
      }
      :host([sticky]:not(.top)) {
        top: -${this.offsetHeight}px;
        transition: var(--sticky-transition-hide, top .4s ease);
      }
      @keyframes backgroundAnimation {
        0%{background-position-y:100%}
        100%{background-position-y:0%}
      }
      @keyframes slideInRight {
        0% {
          background-color: white;
          right: -100%;
        }
        100% {
          right: -6%;
        }
      }
      @keyframes slideOutRight {
        0% {
          right: -6%;
        }
        99% {
          background-color: white;

        }
        100% {
          right: -100%;
          background-color: transparent;
        }
      }
      
      @keyframes fadeIn {
        100% {
          background-color: rgba(0, 0, 0, 0.5);
        }
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
          padding: var(--padding-mobile, var(--padding, 0 calc(var(--content-spacing, 40px) / 2)));
        }
        :host > header.open {
          box-sizing: var(--box-sizing-open-mobile, var(--box-sizing-open, var(--box-sizing, content-box)));;
          position: var(--position-open-mobile, var(--position-open, var(--position, static)));
          top: var(--top-open-mobile, var(--top-open, var(--top, auto)));
          left: var(--left-open-mobile, var(--left-open, var(--position, auto)));
          /* width: var(--width-open-mobile, var(--width-open, var(--width, auto)));*/
          
        }
        :host > header > ${this.getAttribute('m-navigation') || 'm-navigation'} {
          display: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-display-mobile, block);
          left: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-left-mobile, "");
          right: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-right-mobile, "");
          background-color: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-background-color-mobile, transparent);
          height: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-height-mobile, 0);
          overflow: hidden;
          position: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-position-mobile, absolute);
          align-items: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-align-items-mobile, normal);
          justify-content: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-justify-content-mobile, normal);
          transition: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-transition, all 0.2s ease);
          top: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-top-mobile, var(--height-mobile, 50px));
          padding: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-padding-mobile, 0);
          width: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-width-mobile, 100%);
          max-width: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-max-width-mobile, 100%);
          z-index: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-z-index-mobile, 2);
          opacity: 0;
          animation: slideOutRight 0.5s forwards ease-in-out;
        }
        :host > header > a {
          align-self: var(--a-align-self-mobile, var(--a-align-self, var(--align-self, auto)));
          font-size: var(--a-font-size-mobile, var(--a-font-size, var(--font-size)));
          padding: var(--a-padding-mobile, var(--a-padding, 0));
          margin: var(--a-margin-mobile, var(--a-margin, 0));
          order: var(--order-mobile, var(--order, 1));
        }
      
        :host > header.open > ${this.getAttribute('m-navigation') || 'm-navigation'} {
          display: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-display-open-mobile, var(--${this.getAttribute('m-navigation') || 'm-navigation'}-display-mobile, block));
          height: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-height-open-mobile, 100vh);
          overflow-y: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-overflow-y-open-mobile, auto);
          padding: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-padding-open-mobile, var(--${this.getAttribute('m-navigation') || 'm-navigation'}-padding-mobile, 0));
          right: var(--${this.getAttribute('m-navigation') || 'm-navigation'}-right-open-mobile, "");
          animation: slideInRight 0.3s forwards ease-in-out;
        }
        :host  > header > a-menu-icon{
          align-self: var(--a-menu-icon-align-self-mobile, var(--a-menu-icon-align-self, var(--align-self, auto)));
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

    this.setCss(/* CSS */`
    :host > header {
      --header-m-navigation-background-color-mobile: white;
      --header-m-navigation-width-mobile: 33%;
      --header-m-navigation-max-width-mobile: 85%;
      --header-m-navigation-padding-open-mobile: 2rem;
      --header-m-navigation-padding-mobile: 2rem;
      --header-m-navigation-z-index-mobile: 7;
      --header-m-navigation-right-mobile: -100%;
      --header-m-navigation-top-mobile: 0;
      --header-position-open-mobile: relative;
      --navigation-align-items: flex-start;
      --header-a-menu-icon-display-open-mobile: none;
    }
    :host > header.open {}
    :host > header > a-picture {
    --a-title-z-index: 5;
    --picture-margin: 0 auto;
    }
    :host > header > a-title {
      z-index: 5;
      --header-title-height: 95px;
    }
    :host > header > a-menu-icon {
      --header-a-menu-icon-background-color: var(--color-menu-icon);
      --header-a-menu-icon-z-index: 6;
      --header-a-menu-icon-position: absolute;
      --header-a-menu-icon-position-right: 0;
      --header-a-menu-icon-position-top: 1rem;
    }
    :host > header.open > a-menu-icon {
      --header-a-menu-icon-background-color: transparent;
    }

    @media only screen and (max-width: 700px){
      :host > header {
        --header-a-menu-icon-width: min(30px, 12vw);
      }
      :host > header > a-menu-icon {
        --header-a-menu-icon-position-right: -0.5rem;
        --header-a-menu-icon-position-top: 0;
      }
      :host > header > a-title {
        --header-title-width: 80%;
        --header-title-margin: 0.5rem max(2.2vw, 15px) 30px;
      }
    }

    @media only screen and (max-width: 600px){
      :host > header {
        --header-m-navigation-padding-open-mobile: 3rem 2rem 2rem 2rem;
        --header-m-navigation-padding-mobile: 3rem 2rem 2rem 2rem;
      }
    }

    @media only screen and (max-width: 500px){
      :host > header > a-title {
        --header-title-width-mobile: 80%;
        --header-title-font-size-mobile: 1.2rem;
      }
    }
  `, undefined, false, false, this.style)
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML() {
    this.header = this.root.appendChild(document.createElement('header'))
    Array.from(this.root.children).forEach(node => {
      if (node === this.header || node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      this.header.appendChild(node)
    })
    if (this.getAttribute('menu-icon')) {
      this.loadChildComponents().then(children => {
        const MenuIcon = new children[0][1]({ namespace: this.getAttribute('namespace') ? `${this.getAttribute('namespace')}a-menu-icon-` : '', namespaceFallback: this.hasAttribute('namespace-fallback') })
        MenuIcon.setAttribute('tabindex', '0')
        MenuIcon.addEventListener('click', event => {
          this.header.classList.toggle('open')
          const prop = this.header.classList.contains('open') ? 'add' : 'remove'
          document.documentElement.classList[prop](this.getAttribute('no-scroll') || 'no-scroll')
          Array.from(this.header.children).forEach(node => {
            node.classList[prop](this.getAttribute('no-scroll') || 'no-scroll')
            if (node.tagName === 'M-NAVIGATION') {
              const openedLinks = node.root.querySelectorAll('a-link.open')
              const openedLis = node.root.querySelectorAll('li.open')
              const isNavigationOpen = this.header.classList.contains('open')
              if (openedLis.length > 0) openedLis.forEach(li => {
                setTimeout(() => {
                  li.classList.remove('open')
                }, 500);
              })
              if (openedLinks.length > 0) openedLinks.forEach(link => {
                setTimeout(() => {
                  link.classList.remove('open')
                }, 500);
              })
              if (isNavigationOpen) {
                node.setAttribute('tabindex', '0')
              }
              if (!isNavigationOpen) {
                node.setAttribute('tabindex', '-1')
              }
            }
          })
        })
        this.header.appendChild(MenuIcon)
      })
    }
    if (this.hasAttribute('sticky')) this.classList.add('top')
    self.addEventListener('resize', event => document.documentElement.classList.remove(this.getAttribute('no-scroll') || 'no-scroll'))
    this.html = this.style
  }

  /**
   * fetch children when first needed
   *
   * @returns {Promise<[string, CustomElementConstructor][]>}
   */
  loadChildComponents() {
    if (this.childComponentsPromise) return this.childComponentsPromise
    let menuIconPromise
    try {
      menuIconPromise = Promise.resolve({ default: MenuIcon })
    } catch (error) {
      menuIconPromise = import('../atoms/ClassicsMenuIcon.js')
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

  get mNavigation() {
    return this.root.querySelector(this.getAttribute('m-navigation') || 'm-navigation')
  }

  get style() {
    return (
      this._style ||
      (this._style = (() => {
        const style = document.createElement('style')
        style.setAttribute('protected', 'true')
        return style
      })())
    )
  }
}
