const declareStaticComponent = require('~/declareStaticComponent')
const PopUp2 = require('./PopUp2.static')
const PopUp = require('./PopUp.static')
const PopUpStack = require('./PopUpStack.static')
const theme = require('~/theme')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = (attrs) => {
    return `
      <div class="${getClassName()}" data-htmlfilename="${attrs.htmlFileName}">
        ${PopUpStack.renderHTML(
          { variant: 'messy', reverse: true }, `
          ${PopUp2.renderHTML(
            {}, `
            <p>loading ...</p>
          `)}
        `)}
      </div>
    `
  }

  const renderCSS = () => {
    createStyleSheet({
      '': {
        // Initially invisible
        display: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 20,
        textAlign: 'left',

        [`& .${PopUpStack.getClassName()}`]: {
          width: '50vw',
          [`@media screen and (max-width: ${theme.mobileLayoutWidthThreshold}px)`]: {
            // For mobile layout, override the position set when opening the popups
            left: '0 !important',
            width: '80vw'
          }
        },

        [`& .${PopUp.getClassName()}`]: {
          extend: [theme.responsiveText(120, 0.3)],
        },
      }
    })
  }

  return { renderHTML, renderCSS }
})
