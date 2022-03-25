// @ts-check
import Body from '../organisms/Body.js'

/* global CustomEvent */
/* global self */

/**
 * 
 *
 * @export
 * @class Hotspot
 * @type {CustomElementConstructor}
 * @css {
 * 
 * }
 * @attribute {
 * {number} [top] The position to top
 * {number} [left] The position to left
 * {left, right, top, bottom } [place=bottom] default is bottom

 * }
 */
export default class Hotspot extends Body {
  constructor (...args) {
    super(...args)
    this.hasRendered = false;

    this.buttonClickListener = e => {
      if (this.classList.contains("active")){
        this.classList.remove("active")
      }else{
        this.classList.add("active")
      }
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML();
    this.buttonOpen.addEventListener('click', this.buttonClickListener)
    this.buttonClose.addEventListener('click', this.buttonClickListener)
  }

  disconnectedCallback () {
    this.buttonOpen.removeEventListener('click', this.buttonClickListener)
    this.buttonClose.removeEventListener('click', this.buttonClickListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.hasRendered
  }
  

  /**
   * renders the a-Hotspot css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host{
        position: absolute;
        top: ${this.getAttribute('top')}%;
        left: ${this.getAttribute('left')}%;
        z-index:1;
        width: 0;
        height: 0;
      }
      :host(.active){
        z-index: 2;
      }

      :host .btn-close{
        display: none;
      }
      :host .btn-open {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 49px;
        height: 49px;
        padding: 0;
        border: 0;
        background-color: transparent;
        border-radius: 50%;
        box-shadow: 1px 1px 15px -2px rgba(0,0,0,.1);
        outline: 0;
        transform: translate(-50%,-50%);
        transition: transform .2s ease-out,
          box-shadow .2s ease-out,
          background-color .2s ease-out;
        will-change: transform;
      }

      :host .btn-open:before,
      :host .btn-open:after {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        cursor: pointer;
      }
      :host .btn-open:before{
        width: 49px;
        height: 49px;
        background-color: rgba(255,255,255,.5);
        content: '';
        transform: translate(-50%,-50%);
        transition: background-color .2s ease-out;
      }


      :host(:nth-child(1n)) .btn-open:before{
        animation: button-pulse 1s ease;
      }      
      :host(:nth-child(2n)) .btn-open:before{
        animation: button-pulse 1s 250ms ease;
      }      
      :host(:nth-child(3n)) .btn-open:before{
        animation: button-pulse 1s .5s ease;
      }

      @keyframes button-pulse {
        0% {
        transform:translate(-50%,-50%) scale(1)
        }
        30% {
        transform:translate(-50%,-50%) scale(1.5)
        }
        100% {
        transform:translate(-50%,-50%) scale(1)
        }
      }

      :host .btn-open:after{
        width: 35px;
        height: 35px;
        background-image: url(../assets/img/close-white.svg);
        background-color: #ff6600;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        box-shadow: 0 0 0 0 transparent;
        content: '';
        transform: translate(-50%,-50%) rotate(-45deg);
        transition: transform .2s ease-out,
          box-shadow .2s ease-out,
          background-color .2s ease-out;
      }
      :host .btn-open:hover:after{
        background-color: #AACF80;
        box-shadow: 0 0 6px 0 rgba(0,0,0,.6);
      }
      :host(.active) .btn-open:after{
        background-color: #AACF80;
        transform: translate(-50%,-50%) rotate(0);
      }

      :host .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
      }

      @media screen and (min-width: 768px){
        :host .content{
          visibility: hidden;
          position: absolute;
          background: white;
          padding: 20px;
          transform: scale(0) translate(-50%,-50%);
          transition: transform 250ms cubic-bezier(.755,.05,.855,.06),
            visibility 250ms cubic-bezier(.755,.05,.855,.06),
            background-color 250ms cubic-bezier(.755,.05,.855,.06);
          top: 50%;
          left: 50%;
          transform-origin: top left;
          width: 350px;
          ${this.CSSPlace}
        }
        :host(.active) .content{
          visibility: visible;
          transition: transform .4s 250ms cubic-bezier(.23,1,.32,1),
            background-color .4s 250ms cubic-bezier(.23,1,.32,1),
            visibility .4s 250ms cubic-bezier(.23,1,.32,1);
          ${this.CSSPlaceActive}
        }
        :host .content:after{
          position: absolute;
          z-index: -1;
          width: 0;
          height: 0;
          border: solid #fff;
          border-width: 12px;
          margin-left: -12px;
          box-shadow: 5px 5px 15px -6px transparent;
          content: ' ';
          pointer-events: none;
          transition: box-shadow .1s cubic-bezier(.755,.05,.855,.06),
            transform .1s cubic-bezier(.755,.05,.855,.06);
          ${this.CSSPlaceAfter}
        }
      }

      
      @media screen and (max-width: 767px){
        :host .content{
          position: fixed;
          top: auto;
          right: 0;
          bottom: 0;
          left: 0;
          padding: 0 18px 18px;
          backface-visibility: hidden;
          background-color: #fff;
          border-radius: 10px 10px 0 0;
          box-shadow: 0 0 10px 0 rgb(83 83 83 / 20%);
          outline: 0;
          transition: height .3s,animation .3s ease-in-out;
          visibility: hidden;
          overflow-x: hidden;
          overflow-y: scroll;
        }
        :host(.active) .content{
          animation: fadeInBottom 1s ease;
          visibility: visible;
        }
        @keyframes fadeInBottom{
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }
        :host .content:before{
          position: absolute;
          top: 10px;
          left: 50%;
          width: 40px;
          height: 4px;
          background-color: #ff6600;
          border-radius: 4px;
          content: '';
          transform: translateX(-50%);
        }
        :host .content-title{
          position: relative;
          min-height: 40px;
          padding: 10px 0 12px;
          margin-bottom: 12px;
          font-size: 1.8rem;
        }
        :host .content-title:after{
          position: absolute;
          bottom: 0;
          left: -18px;
          width: calc(100% + 36px);
          height: 2px;
          background-color: #f3f2f0;
          content: '';
        }
        
        
        :host .btn-open {
          box-shadow: none;
        }
        :host .btn-open:before{
          background-color: transparent;
        }
        :host .btn-close{
          display:block;
          position: absolute;
          top: 20px;
          right: 20px;
          width: 16px;
          height: 16px;
          padding: 0;
          border: 0;
          background-color: transparent;
          background-image: url(../assets/img/close-orange-large.svg);
          background-repeat: no-repeat;
          background-size: contain;
          border-radius: 50%;
        }
      }
    `
  }


  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    this.hasRendered = true

    this.buttonOpen.classList.add("btn-open")
    this.buttonClose.classList.add("btn-close")
    Array.from(this.span).forEach(node => {
      this.buttonOpen.appendChild(node) 
      if (node.classList.contains("sr-close")) this.buttonClose.appendChild(node.cloneNode())
    })

    this.divTitle.classList.add("content-title")
    this.divTitle.appendChild(this.content.querySelector('h3'))
    this.content.prepend(this.divTitle)
    this.content.appendChild(this.buttonClose)

    this.html = this.buttonOpen;
  }

  get CSSPlace(){
    switch(this.getAttribute('place')){
      case "Left":
        return `
          right: 0;
          left: auto;
          transform-origin: top right;
        `
      case "Right":
        return `
        `
      case "Top":
        return `
          top: auto;
          bottom: 0;
          transform-origin: bottom left;
        `
      case "Bottom":
      default:
        return `

        `
    }
  }

  get CSSPlaceActive(){
    switch(this.getAttribute('place')){
      case "Left":
        return `
          transform: scale(1) translate(-48px,-50%);
        `
      case "Right":
        return `
          transform: scale(1) translate(48px,-50%);
        `
      case "Top":
        return `
          transform: scale(1) translate(-50%,-48px);
          transition: transform .4s 250ms cubic-bezier(.23,1,.32,1),
            background-color .4s 250ms cubic-bezier(.23,1,.32,1),
            visibility .4s 250ms cubic-bezier(.23,1,.32,1);
        `
      case "Bottom":
      default:
        return `
          transform: scale(1) translate(-50%,48px);
        `
    }
  }

  get CSSPlaceAfter(){
    switch(this.getAttribute('place')){
      case "Left":
        return `
          transform: translate(0,-50%) rotate(-45deg) scale(1);
          top: 50%;
          left: 100%;
        `
      case "Right":
        return `
          transform: translate(0,-50%) rotate(135deg) scale(1);
          top: 50%;
          left: 0;
        `
      case "Top":
        return `
          transform: translate(0,-50%) rotate(45deg) scale(1);
          box-shadow: 5px 5px 15px -6px rgba(0,0,0,.3);
          transition: box-shadow .1s 250ms cubic-bezier(.23,1,.32,1),
            transform .3s .4s cubic-bezier(.23,1,.32,1);
          top: 100%;
          left: 50%;
        `
      case "Bottom":
      default:
        return `
          top: 0;
          left: 50%;
          transform: translate(0,-50%) rotate(-135deg) scale(1);
        `
    }
  }


  get content (){
    return this.root.querySelector('.content')
  }

  get divTitle () {
    return this._divTitle || (this._divTitle = document.createElement('div'))
  }

  get buttonOpen () {
    return this._buttonOpen || (this._buttonOpen = document.createElement('button'))
  }

  get buttonClose () {
    return this._buttonClose || (this._buttonClose = document.createElement('button'))
  }

  get span (){
    return this.root.querySelectorAll('span.sr-only')
  }
  get spanClose (){
    return this.root.querySelector('span.sr-close')
  }
}

