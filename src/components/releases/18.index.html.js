const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')
const PopUp = require('~/components/PopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/18/screengrab3.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/18/screengrab2.jpg' }
      })}

      ${MediaPopUp.renderHTML({
        image: { srcUrl: 'releases/18/screengrab1.jpg' }
      })}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>L;ç°°ç played a 1h30 long show as part of the second Branlr Room on chatroulette</p> 
        <p><a href="https://www.youtube.com/watch?v=JlmTl4iXbgA" target="_blank">TRAILER</a> | <a href="https://www.youtube.com/watch?v=CzqIWL5GXs8" target="_blank">FULL</a></p>
        <iframe
          width="100%" height="auto"
          src="https://www.youtube.com/embed/JlmTl4iXbgA"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      `)}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          This release is a recording from L;ç°°ç exclusive show at Branlr Room which was broadcasted on chatroulette and chaturbate on the 28/10/2018
        </p>
      `)}

      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '09/12/2018',
        table: [
          ['Videos Uploaded', '5 (1h30 live performance divided in 5 parts)'],
          ['Total Plays', '2130']  
        ]
      })}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
