const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/19/screengrab3.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/19/screengrab2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/19/screengrab1.jpg' }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '09/01/2018',
        table: [
          ['Videos Uploaded', '10 (on 10 different porn streaming websites)'],
          ['Total Plays', '3600']  
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
