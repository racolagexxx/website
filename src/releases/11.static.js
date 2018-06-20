const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')
const PopUp = require('../components/PopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/11/screengrab3.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/11/screengrab2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/11/screengrab1.jpg' }
      })}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          For this track, we experimented releasing with gig economy platforms, and hired
          cheap freelancers to do social media promotion for us.
        </p>
      `)}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '20/06/2018',
        table: [
          ['Workers Hired', '5'],
          ['Total Plays', '1283'],
          ['Comments', '2']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
