import Navigation from '../web-components-cms-template/src/es/components/molecules/Navigation.js'


export default class MIndustryNavigation extends Navigation {
  constructor(...args){
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

  renderCSS () {
    this.css = /* css */`
      :host {
        color: black;
        background-color: var(--background-color);
      }
      :host a-link {
        --padding: var(--a-link-content-spacing, 14px 10px);
        --font-size: var(--a-link-font-size, 1rem);
        --font-weight: var(--a-link-font-weight);
        --line-height: var(--a-link-line-height);
        --text-transform: var(--a-link-text-transform);
        font-family: var(--a-link-font-family);
        font-weight: var(--a-font-weight, var(--font-weight, normal));
      }
      :host(.${this.getAttribute('no-scroll') || 'no-scroll'}) a-link {
        --color: var(--a-link-color-${this.getAttribute('no-scroll') || 'no-scroll'});
        --padding: var(--a-link-content-spacing-${this.getAttribute('no-scroll') || 'no-scroll'}, 14px 10px);
        --font-size: var(--a-link-font-size-${this.getAttribute('no-scroll') || 'no-scroll'}, 1rem);
        --font-weight: var(--a-link-font-weight-${this.getAttribute('no-scroll') || 'no-scroll'});
        --line-height: var(--a-link-line-height-${this.getAttribute('no-scroll') || 'no-scroll'});
      }
      :host(.${this.getAttribute('no-scroll') || 'no-scroll'}) > nav > ul li ul a-link {
        --font-size: var(--a-link-second-level-font-size, 1rem);
        --font-weight: var(--a-link-second-level-font-weight, var(--a-link-font-weight));
        --line-height: var(--a-link-second-level-line-height);
        font-family: var(--a-link-second-level-font-family);
        font-weight: var(--a-font-weight, var(--font-weight, normal));
      }
      ${(this.getAttribute('hover') === 'true' &&
      `:host > nav > ul li:hover ul a-link,
      :host > nav > ul li ul:hover a-link,`) || ''}
      :host > nav > ul li a-link.open ~ ul a-link {
        --font-size: var(--a-link-second-level-font-size-${this.getAttribute('no-scroll') || 'no-scroll'}, 1rem);
        --font-weight: var(--a-link-second-level-font-weight-${this.getAttribute('no-scroll') || 'no-scroll'}, var(--a-link-font-weight-${this.getAttribute('no-scroll') || 'no-scroll'}));
        --line-height: var(--a-link-second-level-line-height-${this.getAttribute('no-scroll') || 'no-scroll'});
      }
      :host ul{
        background-color: var(--background-color, black);
        list-style: var(--list-style, none);
        margin: 0;
        padding: 0;
        transition: var(--transition, all 0.2s ease);
      }
      :host(.${this.getAttribute('no-scroll') || 'no-scroll'}) ul {
        background-color: var(--background-color-${this.getAttribute('no-scroll') || 'no-scroll'}, var(--background-color, black));
      }
      :host > nav > ul{
        align-items: var(--align-items, center);
        display: flex;
        flex-direction: var(--flex-direction, row);
        padding: var(--padding, calc(var(--content-spacing, 40px) / 2) 0);
      }
      :host(.${this.getAttribute('no-scroll') || 'no-scroll'}) > nav > ul {
        padding: var(--padding-${this.getAttribute('no-scroll') || 'no-scroll'}, calc(var(--content-spacing, 40px) / 2) 0);
      }
      :host > nav > ul > li{
        display: block;
        padding: 0 calc(var(--content-spacing, 40px) / 4);
      }
      :host > nav > ul li{
        position: relative;
      }
      :host > nav > ul li > a-arrow {
        display: none;
        user-select: none;
        visibility: hidden;
      }
      :host > nav > ul li ul{
        display: var(--li-ul-display, none);
        padding-top: calc(var(--content-spacing, 40px) / 2 + 1px);
        margin: var(--li-ul-margin);
        position: var(--li-ul-position, absolute);
        width: var(--li-ul-width, max-content);
        transition: var(--transition, all 0.2s ease);
      }
      ${(this.getAttribute('hover') === 'true' &&
      `:host > nav > ul li:hover ul,
      :host > nav > ul li ul:hover,`) || ''}
      :host > nav > ul li a-link.open ~ ul {
        display: block;
        margin: var(--li-ul-margin-${this.getAttribute('no-scroll') || 'no-scroll'});
      }
      :host > nav > ul li:last-child ul{
        right: 0;
      }
      :host > nav > ul li:hover{
        cursor: pointer;
      }
      :host > nav > ul li ul li {
        min-width: var(--min-width, 100px);
      }
      :host > nav > ul > li > ul > li:first-child{
        padding-top: var(--padding-top, 6px);
        border-top: var(--border-top, 1px solid) var(--hr-color, var(--color, white));
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    console.log('render')
    this.loadChildComponents().then(children => Array.from(this.root.querySelectorAll('a')).forEach(a => {
      const li = a.parentElement
      if (!li.querySelector('ul')) li.classList.add('no-arrow')
      const aLink = new children[0][1](a, { namespace: this.getAttribute('namespace') || '' })
      aLink.setAttribute('hit-area', this.getAttribute('hit-area') || 'true')
      const arrow = new children[1][1]({ namespace: this.getAttribute('namespace') || '' })
      arrow.setAttribute('direction', 'down')
      const arrowClickListener = event => {
        li.classList.toggle('open')
        arrow.setAttribute('direction', li.classList.contains('open') ? 'up' : 'down')
      }
      arrow.addEventListener('click', arrowClickListener)
      aLink.addEventListener('click', event => {
        if (event.target) {
          arrowClickListener()
          let a = null
          if (event.target.root && (a = event.target.root.querySelector('a'))) {
            if (!a.getAttribute('href') || a.getAttribute('href') === '#') {
              event.preventDefault()
              if (this.focusLostClose) event.stopPropagation()
              Array.from(this.root.querySelectorAll('a-link.open')).forEach(aLink => aLink.classList.remove('open'))
              event.target.classList.add('open')
            } else if (a.getAttribute('href')[0] === '#') {
              this.dispatchEvent(new CustomEvent(this.getAttribute('click-anchor') || 'click-anchor', {
                detail: {
                  selector: a.getAttribute('href')
                },
                bubbles: true,
                cancelable: true,
                composed: true
              }))
            }
          }
        }
      })
      if (this.focusLostClose) self.addEventListener('click', event => Array.from(this.root.querySelectorAll('a-link.open')).forEach(aLink => aLink.classList.remove('open')))
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
    if (this.childComponentsPromise) return this.childComponentsPromise
    let linkPromise, arrowPromise
    try {
      linkPromise = Promise.resolve({ default: Link })
    } catch (error) {
      linkPromise = import('../web-components-cms-template/src/es/components/atoms/Link.js')
    }
    try {
      arrowPromise = Promise.resolve({ default: Arrow })
    } catch (error) {
      arrowPromise = import('../web-components-cms-template/src/es/components/atoms/Arrow.js')
    }
    return (this.childComponentsPromise = Promise.all([
      linkPromise.then(
        /** @returns {[string, CustomElementConstructor]} */
        module => ['a-link', module.default]
      ),
      arrowPromise.then(
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
