const { component } = require('../base.static')
const ReleaseCoverPopUp = require('../components/ReleaseCoverPopUp.static')
const PopUp = require('../components/PopUp.static')

module.exports = component(__filename, () => {

  const renderHTML = function(attrs) {
    return `

      ${PopUp.renderHTML(
        { variant: 'popup2' }, `
        <p>
          This release is a recording from L;ç°°ç exclusive show at Branlr Room which was broadcasted on chatroulette and chaturbate on the 28/10/2018
        </p>
      `)}

      ${ReleaseCoverPopUp.renderHTML(attrs)}
    `
  }

  const renderCSS = () => {}

  return { renderHTML, renderCSS }
})
