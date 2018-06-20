const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const { BaseComponent, fetchHTML, component } = require('../base')
const PopUp = require('./PopUp')
const PopUpStack = require('./PopUpStack')

const CONTAINER_ID = 'ReleaseDetailsContainer'

module.exports = component(__filename, ({ getClassName }) => {

  class ReleaseDetails extends BaseComponent {

    constructor(el, opts) {
      super()
      this.el = $(el)
      this.releaseContainer = $(opts.releaseContainer)
      this.moveAboveAll()
    }

    load() {
      const position = this.releaseContainer.offset()

      // Place the popups on top of the release releaseContainer, making sure that
      // they don't overflow from the window
      const margin = 0.075 * $(window).width()
      position.left = Math.max(margin,
        position.left + this.releaseContainer.width() / 2 - this.el.width() / 2)
      position.left = Math.min(position.left,
        $(window).width() - this.el.width() - margin)

      // Move popups and make them visible
      this.moveAboveAll()
      this.el.css(position)
      this.el.show()

      if (!this.fetchHTMLPromise)
        this.fetchHTMLPromise = fetchHTML(this.el.data('htmlfilename'))

      this.fetchHTMLPromise.then((str) => {
        // Set the html for the popup stack and create JS components
        const popUpStackEl = $(this.el.find(`.${PopUpStack.getClassName()}`).get(0))
        popUpStackEl.html(str)
        new PopUpStack(popUpStackEl)
        this.el.find(`.${PopUp.getClassName()}`).each((i, el) => {
          new PopUp(el, { mode: 'destroy' })
        })
      })
      .catch((err) => {
        console.error(err)
      })
    }

    // Move the release details above other release details currently open
    moveAboveAll() {
      this.el.detach()
      let container = $(`#${CONTAINER_ID}`)
      if (container.length === 0)
        container = $('<div>', { id: CONTAINER_ID }).appendTo('body')
      container.append(this.el)
    }

  }

  return ReleaseDetails

})
