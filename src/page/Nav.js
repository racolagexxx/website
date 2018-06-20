const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const imagesLoaded = require('imagesloaded')
const { BaseComponent, component, createGenerateClassName } = require('../base')

module.exports = component(__filename, ({ getClassName }) => {

  class Nav extends BaseComponent {

    constructor(element) {
      super()
      // Setup scrollspy to set nav item to "active" automatically when scrolling the page.
      const scrollspy = require('bootstrap/js/scrollspy')
      $('body')
        .scrollspy({ target: 'nav' })
        .imagesLoaded(() => {
          // TODO : FIX
          this.scrollToHash()
        })
    }

    scrollToHash() {
      if (HTMLElement.prototype.scrollIntoView && $(location.hash).length)
        $(location.hash).get(0).scrollIntoView()
    }

  }

  return Nav
})
