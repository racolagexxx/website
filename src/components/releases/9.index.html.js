const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')
const PopUp2 = require('~/components/PopUp2.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML(
        {video: {
          sourceUrls: [ 'releases/9/vid3.mp4', 'releases/9/vid3.webm' ],
        }}
      )}

      ${MediaPopUp.renderHTML(
        {video: {
          sourceUrls: [ 'releases/9/vid2.mp4', 'releases/9/vid2.webm' ],
        }}
      )}

      ${MediaPopUp.renderHTML(
        {video: {
          sourceUrls: [ 'releases/9/vid1.mp4', 'releases/9/vid1.webm' ],
        }}
      )}

      ${PopUp2.renderHTML(
        {}, `
        <p>
          For this track, we experimented releasing through porn ad networks.
          We created a gif banner and bought a cheap ad campaign (about 0.05 euros per 1000 impressions).
        </p>
      `)}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '12/01/2018',
        table: [
          ['Ad Printed', '659743 times'],
          ['Total Plays', '529'],
          ['Thumbed Up', '1']
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
