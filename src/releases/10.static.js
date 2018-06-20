const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/10/screengrab2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/10/screengrab1.jpg' }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '07/02/2018',
        table: [
          ['Videos Uploaded', '9'],
          ['Total Plays', '11 342'],
          ['Comments', '2']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
