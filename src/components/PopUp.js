const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const declareJsComponent = require('~/declareJsComponent')

module.exports = declareJsComponent(__filename, ({ getClassName }) => {

  class PopUp {

    constructor(element, opts = {}) {
      this.opts = Object.assign({ mode: 'hide' }, opts)
      this.el = $(element)

      // Destroys/hides the popup when close button clicked
      this.el.find('.close').click((event) => {
        if (this.opts.mode === 'destroy') {
          this.el.detach()
          if (this.opts.onClose)
            this.opts.onClose()
          event.stopImmediatePropagation()

        } else if (this.opts.mode === 'hide') {
          this.el.css({ 'visibility': 'hidden' })

        } else {
          throw new Error('invalid : ' +  this.opts.mode)
        }
      })
    }

    destroy() {
      this.removeAllListeners()
      this.el.remove()
    }

  }

  return PopUp

})
