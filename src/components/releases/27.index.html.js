const declareStaticComponent = require('~/declareStaticComponent')
const PopUp = require('~/components/PopUp.static')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const ReleaseAnalyticsPopUp = require('~/components/ReleaseAnalyticsPopUp.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `
      ${ReleaseAnalyticsPopUp.renderHTML({
        date: '01/03/2021',
        table: [
          ['Academia.edu phishing articles', '20'],
          ['Total Plays', '30'],
        ]
      })}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          Spells Disaster played a 30 minutes show for Branlr Room on chaturbate.com. 
          The show was then recorded and looped on the live cam for the whole month of July!
        </p> 
        <iframe
          width="100%" height="auto"
          style="min-height:50vh;"
          src="https://www.youtube.com/embed/3BL4zVauDBk"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      `)}

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          For this release by Spells Disaster, we experiment with a brand new technique : 
          mis-using the mentions system of academia.edu, a social network for academics. 
          We will try to upload generated papers to attrack clicks from other members from
          the site. Fingers crossed we will get a lot of plays through this 🤞🤞🤞
        </p>
      `)}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})