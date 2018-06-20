const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const imagesLoaded = require('imagesloaded')
const { BaseComponent, component } = require('../base')
const PopUp = require('./PopUp')

module.exports = component(__filename, ({ getClassName }) => {

  class PopUpStack extends BaseComponent {

    constructor(el) {
      super()
      this.el = $(el)
      this.resetPopUps()
      this.el.find(`.${getClassName('reset')} button`)
        .click(this.resetPopUps.bind(this))
    }

    resetPopUps() {
      let elemList = this.el.find(`.${PopUp.getClassName()}`)
        .css({ 'visibility': 'visible' })
        .toArray()

      if (this.el.data('variant') === 'neat') {
        if (this.el.data('reverse') === true)
          elemList = elemList.reverse()
        elemList.forEach(function(el, i) {
          const mult = Math.floor((i + 1) - elemList.length / 2)
          const margin = '' + (mult * 1.2) + 'em'
          $(el).css({
            'margin-top': margin,
            'margin-left': margin
          })
        })

      } else if (this.el.data('variant') === 'messy') {
        const getRandomVal = () => {
          return ((Math.random() * 2 - 1) * 3) + 'vw'
        }
        // Slightly move about randomly
        $(elemList[0]).css({
          position: 'relative',
          top: getRandomVal(),
          left: getRandomVal()
        })
        elemList.slice(1).forEach(function(el, i) {
          $(el).css({
            'margin-top': getRandomVal(),
            'margin-left': getRandomVal()
          })
        })

        if (this.el.data('autoresize')) {
          this.el.imagesLoaded(() => {
            const maxY = Math.max(...elemList.map(function(el) {
              return $(el).position().top + $(el).height()
            }))
            this.el.css({ height: maxY + 50 })
          })
        }

      } else {
        throw new Error('invalid : ' + this.el.data('variant'))
      }
    }

  }

  return PopUpStack

})
