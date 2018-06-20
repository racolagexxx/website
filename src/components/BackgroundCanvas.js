const $ = global.jQuery = require('jquery/dist/jquery.slim.js')

const { BaseComponent, loadImage, component } = require('../base')

module.exports = component(__filename, ({ getClassName }) => {

  let imgElement

  class BackgroundCanvas extends BaseComponent {

    constructor(canvas) {
      super()
      this.el = $(canvas)
      const ctx = canvas.getContext('2d')
      const container = this.el.parent()

      const settings = {
        squareSize: this.el.data('squaresize') || 0.1,        // Size of the square picked for the effect
        range: this.el.data('range') || 0.15,                 // Range (as a ratio) of the area in which the square is picked
        scrambleCount: this.el.data('scramblecount') || 400   // Number of scrambles per touch / move
      }

      canvas.width = container.width()
      canvas.height = container.height()

      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height)

      const scramblePixels = function(pageX, pageY) {
        let { squareSize, range, scrambleCount } = settings
        const squareW = squareSize * container.width()
        const squareH = squareSize * container.height()
        const x1 = (pageX - container.offset().left) - squareW / 2
        const y1 = (pageY - container.offset().top) - squareH / 2
        const x2 = x1 + (Math.random() * 2 - 1) * (canvas.width * range)
        const y2 = y1 + (Math.random() * 2 - 1) * (canvas.height * range)
        const imageData1 = ctx.getImageData(x1, y1, squareW, squareH)
        const imageData2 = ctx.getImageData(x2, y2, squareW, squareH)
        ctx.putImageData(imageData1, x2, y2)
        ctx.putImageData(imageData2, x1, y1)
      }

      container.mousemove(function(event) { scramblePixels(event.pageX, event.pageY) })
      container.on('touchstart', function(event) {
        for(let i = 0; i < settings.scrambleCount; i++) {
          scramblePixels(event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY)
        }
      })
    }
  }

  BackgroundCanvas.loadBgImage = function() {
    return loadImage(require('../images/header-bg.jpg'))
      .then((elem) => imgElement = elem)
  }

  return BackgroundCanvas

})
