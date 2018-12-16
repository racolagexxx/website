const $ = global.jQuery = require('jquery/dist/jquery.slim.js')

const declareJsComponent = require('~/declareJsComponent')
const BackgroundCanvas = require('~/components/BackgroundCanvas')
const LazyImage = require('~/components/LazyImage')
const PopUp = require('~/components/PopUp')
const PopUpStack = require('~/components/PopUpStack')
const Release = require('~/components/Release')

const Nav = require('./Nav')
const Header = require('./Header')


module.exports = declareJsComponent(__filename, ({ getClassName }) => {

  class IndexPage {

    constructor() {
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

  return IndexPage

})
