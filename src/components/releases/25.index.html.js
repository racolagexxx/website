const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')
const PopUp = require('~/components/PopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')


module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        video: { sourceUrls: ['releases/25/video.mp4', 'releases/25/video.webm'] }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '30/05/2018',
        table: [
          ['YouTube Phishing Videos Uploaded', '13'],
          ['Total Plays', '5705'],
        ]
      })}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          Making good use of our new #YouTube phishing technique for releasing this great noisy track by Ben Glas. The music is played on top of videos of #BTS, #CardiB, #LilDicky, etc ... This is used to phish unsuspecting listeners, which were instead searching for new videos of their favorite pop artists 😲🤩❤️
        </p>
      `)}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
