const $ = global.jQuery = require('jquery/dist/jquery.slim.js')
const { BaseComponent, component } = require('../base')
const PopUp = require('./PopUp')
const LazyImage = require('./LazyImage')
const ReleaseDetails = require('./ReleaseDetails')

module.exports = component(__filename, ({ getClassName }) => {

  class Release extends BaseComponent {

    constructor(el) {
      super()
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
