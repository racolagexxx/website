const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/13/screengrab3.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/13/screengrab2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/13/screengrab1.jpg' }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '23/05/2018',
        table: [
          ['Videos Uploaded', '10'],
          ['Total Plays', '19 000']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
