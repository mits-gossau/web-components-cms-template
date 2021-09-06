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
    super.renderCSS();
    this.css = /* css */`
      :host ul{
        list-style: var(--list-style, none);
        margin: 0;
        padding: 0;
        transition: var(--transition, all 0.2s ease);
      }
      :host > nav {
        float: var(--float);
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
      :host > nav > ul > li > .open {
        background-color: white;
      }
      :host > nav > ul li > a-arrow {
        display: none;
        user-select: none;
        visibility: hidden;
      }
      ${(this.getAttribute('hover') === 'true' &&
      `:host > nav > ul li:hover ul,
      :host > nav > ul li ul:hover,`) || ''}
      :host > nav > ul li a-link.open ~ ul {
        display: block;
        margin: var(--li-ul-margin-${this.getAttribute('no-scroll') || 'no-scroll'});
        background-color: white;
        padding-top: 0;
        margin-top: 41px;
      }
      :host > nav > ul li:last-child ul{
        right: 0;
      }
      :host > nav > ul li:hover{
        cursor: pointer;
      }
      :host > nav > ul li ul li {
        min-width: var(--min-width, 100px);
        padding-left: 30px;
        height: 30px;
      }
      :host > nav > ul li ul li::before {
        position: absolute;
        margin-top: 7px;
        left: 20px;
        top:30%;
        content: "";
        width: 14px;
        height: 16px;
        background: url(../../../img/arrow.svg) left center no-repeat;
        background-size: 8px 9px;
      }
      :host > nav > ul > li > ul > li:first-child{
        padding: var(--first-padding);
      }
      :host > nav > ul > li > ul > li:first-child::before{
        background: none;
      }
      :host > nav > ul > li > ul > li:first-child > a-link {
        --color: var(--color-open);
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
    var search = this.nav.firstChild.lastChild.previousSibling
    search.innerHTML = '';
    var lens = document.createElement('img');
    lens.src = '../../../img/Lupe.svg';
    var a = document.createElement('a');
    a.appendChild(lens)
    search.appendChild(a);
    
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
}
