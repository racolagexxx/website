const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/1/strange-spam.png' }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '09/05/2017',
        table: [
          ['Emails Sent', '500 000'],
          ['Emails Opened', '1977']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
