const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const PopUp = require('~/components/PopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')


module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/21/screengrab1.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/21/screengrab2.jpg' }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '10/04/2018',
        table: [
          ['Femdom Videos Uploaded', '14 (10 + 4)'],
          ['Total Plays From Femdom Videos', '286936 (101526 + 185410)'],
          ['Emails Sent', '1 000 000'],
          ['Total Plays From Emails', '202'],
        ]
      })}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          Part 1/4 from <b>ivvill - cutyou</b> the first ever EP released on racolage.xxx. 
        </p>
        <p>
          To celebrate, we unleash our full spam powers on several porn streaming sites and by sending 1 000 000 spam emails.
        </p>
      `)}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
