const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const { BaseComponent, component } = require('../base')
const PopUp = require('../components/PopUp')

module.exports = component(__filename, ({ getClassName }) => {
  class Header extends BaseComponent {
    constructor(element) {
      super()
      this.el = $(element)
      const headerPopupFront = this.el.find(`.${PopUp.getClassName()}`).first()
      const headerPopupBack = this.el.find(`.${PopUp.getClassName()}`).last()
      const headerPopupFrontView = new PopUp(headerPopupFront, { mode: 'hide' })
      const headerPopupBackView = new PopUp(headerPopupBack)
    }
  }

  return Header
})
