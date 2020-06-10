const declareStaticComponent = require('~/declareStaticComponent')
const PopUp = require('~/components/PopUp.static')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          For this great release by Spells Disaster, we experiment with a brand new technique : 
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