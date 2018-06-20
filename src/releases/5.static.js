const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '19/09/2017',
        table: [
          ['Emails Sent', '500 000'],
          ['Unique Listeners', '32'],
          ['Total Plays', '79']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
