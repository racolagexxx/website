const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/7/comments.png' }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '23/12/2017',
        table: [
          ['Emails Sent', '500 000'],
          ['Total Plays', '172'],
          ['Thumbs Down', '4'],
          ['Comments', '2']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
