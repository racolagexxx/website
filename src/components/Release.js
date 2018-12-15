const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const declareJsComponent = require('~/declareJsComponent')
const PopUp = require('./PopUp')
const LazyImage = require('./LazyImage')
const ReleaseDetails = require('./ReleaseDetails')

module.exports = declareJsComponent(__filename, ({ getClassName }) => {

  class Release {

    constructor(el) {
      this.el = $(el)
      this.releaseDetails = new ReleaseDetails(
        this.el.find(`.${ReleaseDetails.getClassName()}`),
        { releaseContainer: this.el }
      )
      this.el.click(() => this.releaseDetails.load())
    }

  }

  return Release

})
