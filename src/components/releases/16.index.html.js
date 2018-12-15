const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '08/09/2018',
        table: [
          ['Emails Sent', '1 000 000'],
          ['Total Plays', '355'],
          ['Thumbs Up', '2'],
          ['Thumbs Down', '9']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
