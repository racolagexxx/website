const BackgroundCanvas = require('~/components/BackgroundCanvas.static')
const PopUp = require('~/components/PopUp.static')
const PopUpStack = require('~/components/PopUpStack.static')
const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {
    return `
      <div class="${getClassName()}">
        ${BackgroundCanvas.renderHTML({ squareSize: 0.1, range: 0.15, scrambleCount: 10 })}

        ${PopUpStack.renderHTML(
          { 'class': [ getClassName('popUpContainer') ], reverse: true, variant: 'neat'  }, `

          ${PopUp.renderHTML(
            { variant: 'popup1', class: [ getClassName('PopUp') ] }, `
            <div>"I	don't even have an idea why someone would listen to this..." <b>David Niklas</b></div>
          `)}

          ${PopUp.renderHTML(
            { variant: 'popup1', class: [ getClassName('PopUp') ] }, `
            <div>"What brainiac had the st*pid idea to create this website？" <b>@hansenhans</b></div>
          `)}

          ${PopUp.renderHTML(
            { variant: 'popup1', class: [ getClassName('PopUp') ] }, `
            <div>"so @racolagexxx is probably the stupidest way I've ever seen to release music." <b>@shaniber</b></div>
          `)}

        `)}
      </div>
    `
  }

  const renderCSS = function() {
    createStyleSheet({
      '': {
        extend: [ theme.centerFlexContent() ],
        height: '22em'
      },

      popUpContainer: {
        extend: [ theme.responsiveWidth(40) ],
        textAlign: 'center',
        zIndex: 2,
      },

      PopUp: {
        extend: [ theme.responsiveText(120, 0.7) ],
        '& .container': {
          minHeight: '8em'
        },
        '& .content': {
          padding: '0 0.1em'
        }
      }

    })
  }

  return { renderCSS, renderHTML }

})
