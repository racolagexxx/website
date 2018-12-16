const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {
    return `
      <div class="${getClassName()}">
        <a href="https://www.facebook.com/racolage/" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
        <a href="https://www.instagram.com/jane_racolage/" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
        <a href="mailto:racolagexxx@protonmail.com" target="_blank"><i class="fa fa-envelope" aria-hidden="true"></i></a>
        <a href="https://twitter.com/racolagexxx" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></i></a>
      </div>
    `
  }
  
  const renderCSS = function() {
    createStyleSheet({
      '': {
        extend: [ theme.responsiveText(170, 0.2) ]
      }
    })
  }

  return { renderHTML, renderCSS }
})