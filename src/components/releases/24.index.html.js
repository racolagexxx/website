const declareStaticComponent = require('~/declareStaticComponent')
const ReleaseCoverPopUp = require('~/components/ReleaseCoverPopUp.static')
const PopUp = require('~/components/PopUp.static')

module.exports = declareStaticComponent(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          Part 4/4 from <b>ivvill - cutyou</b> the first ever EP released on racolage.xxx. 
        </p>
        <p>
          To celebrate, we unleash our full spam powers on several porn streaming sites and by sending 1 000 000 spam emails.
        </p>
      `)}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
