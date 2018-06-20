const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '02/01/2018',
        table: [
          ['Emails sent', '500 000'],
          ['Total Plays', '180'],
          ['Thumbed Down', '12']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
