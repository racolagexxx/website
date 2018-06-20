const $ = global.jQuery = require('jquery/dist/jquery.slim.js')

const { BaseComponent, component } = require('../base')
const Nav = require('./Nav')
const Header = require('./Header')
const BackgroundCanvas = require('../components/BackgroundCanvas')
const LazyImage = require('../components/LazyImage')
const PopUp = require('../components/PopUp')
const PopUpStack = require('../components/PopUpStack')
const Release = require('../components/Release')

module.exports = component(__filename, ({ getClassName }) => {

  class Page extends BaseComponent {

    constructor() {
      super()
      new Nav($(`.${Nav.getClassName()}`))
      new Header($(`.${Header.getClassName()}`))
      $(`.${PopUp.getClassName()}`).each((i, el) => new PopUp(el))
      $(`.${PopUpStack.getClassName()}`).each((i, el) => new PopUpStack(el))
      $(`.${Release.getClassName()}`).each((i, el) => new Release(el))

      LazyImage.initObserver().then(() => {
        $(`.${LazyImage.getClassName()}`).each((i, el) => new LazyImage(el))
      })
      BackgroundCanvas.loadBgImage().then(() => {
        $(`.${BackgroundCanvas.getClassName()}`).each((i, el) => new BackgroundCanvas(el))
      })
    }

  }

  return Page

})