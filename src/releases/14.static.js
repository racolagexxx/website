const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('../components/ReleaseAnalyticsPopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')
const PopUp = require('../components/PopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/14/screengrab4.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/14/screengrab3.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/14/screengrab2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/14/screengrab1.jpg' }
      })}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>Lijnenspel + Lindred played as part of the first Branlr Room on chaturbate: <a href="https://www.youtube.com/watch?v=8Jm1DFBuHEo" target="_blank">VIDEO</a></p>
        <iframe
          width="100%" height="auto"
          src="https://www.youtube.com/embed/8Jm1DFBuHEo"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      `)}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/14/screengrab6.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/14/screengrab5.jpg' }
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
