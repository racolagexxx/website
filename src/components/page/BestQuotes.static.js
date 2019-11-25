const BackgroundCanvas = require('~/components/BackgroundCanvas.static')
const PopUp1 = require('~/components/PopUp1.static')
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

          ${PopUp1.renderHTML(
            { class: [ getClassName('popup') ] }, `
            <div>"I	don't even have an idea why someone would listen to this..." <b>David Niklas</b></div>
          `)}

          ${PopUp1.renderHTML(
            { class: [ getClassName('popup') ] }, `
            <div>"What brainiac had the st*pid idea to create this website？" <b>@hansenhans</b></div>
          `)}

          ${PopUp1.renderHTML(
            { class: [ getClassName('popup') ] }, `
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

      popup: {
        extend: [ theme.responsiveText(120, 0.55) ],
        [`& .${PopUp1.getClassName('body')}`]: {
          minHeight: '8em',
          padding: '0 0.1em'
        },
        '& .content': {
          padding: '0 0.1em'
        }
      }

    })
  }

  return { renderCSS, renderHTML }

})
