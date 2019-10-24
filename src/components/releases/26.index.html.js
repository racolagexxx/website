const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')


module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/26/screengrab2.jpg' }
      })}
      
      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/26/screengrab1.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        video: { sourceUrls: ['releases/26/video.mp4', 'releases/26/video.webm'] }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '24/10/2019',
        table: [
          ['YouTube Phishing Videos Uploaded', '3'],
          ['Porn Streaming Videos Uploaded', '3'],
          ['Total Plays', '9316'],
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
