const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/15/screengrab2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/15/screengrab1.jpg' }
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
