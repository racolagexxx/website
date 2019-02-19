const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')


module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/20/screengrab1.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/20/screengrab2.jpg' }
      })}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '19/02/2018',
        table: [
          ['Videos Uploaded', '10'],
          ['Total Plays', '37050']  
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
