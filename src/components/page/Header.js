const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const declareJsComponent = require('~/declareJsComponent')
const PopUp = require('~/components/PopUp')

module.exports = declareJsComponent(__filename, ({ getClassName }) => {
  class Header {
    constructor(element) {
      this.el = $(element)
      const headerPopupFront = this.el.find(`.${PopUp.getClassName()}`).first()
      const headerPopupBack = this.el.find(`.${PopUp.getClassName()}`).last()
      const headerPopupFrontView = new PopUp(headerPopupFront, { mode: 'hide' })
      const headerPopupBackView = new PopUp(headerPopupBack)
    }
  }

  return Header
})
