const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')
const PopUp = require('../components/PopUp.static')


module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/6/screen4.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/6/screen3.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/6/screen2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/6/screen1.jpg' }
      })}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          For this track, we experimented releasing through Tinder.
          Jane matched with people from different countries and started conversations
          in order to get her matches to listen to the release.
        </p>
      `)}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '12/12/2017',
        table: [
          ['Tinder Matches', '611'],
          ['Conversations Started', '539'],
          ['Unique Listeners', '138'],
          ['Total Plays', '435'],
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
