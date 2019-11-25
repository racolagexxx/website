const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')
const BackgroundCanvas = require('~/components/BackgroundCanvas.static')
const PopUp1 = require('~/components/PopUp1.static')
const PopUpStack = require('~/components/PopUpStack.static')
const SocialMedia = require('./SocialMedia.static')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {

    return `
      <header class="${getClassName()}">
        ${BackgroundCanvas.renderHTML({ squareSize: 0.9, range: 0.03, scrambleCount: 10 })}

        ${PopUpStack.renderHTML(
          { 'class': [ getClassName('popUpContainer') ], variant: 'neat' }, `

          ${PopUp1.renderHTML(
            { class: [ getClassName('popup') ] }, `
            <a class="title" href="#about">
              <h1>
                <div><img class="${getClassName('logos')}" src="images/logo.svg" /></div>
                racolage.xxx is a record label that releases experimental music through <u>spam</u>
              </h1>
            </a>
            ${SocialMedia.renderHTML()}
          `)}

          ${PopUp1.renderHTML(
            { class: [ getClassName('popup') ], noClose: true }, `
            <img class="${getClassName('logos')} logo" src="images/logo2.svg" />
          `)}

        `)}
      </header>
    `
  }

  const renderCSS = function() {
    createStyleSheet({

      '': {
        extend: [ theme.centerFlexContent() ],
        height: '100%',
        minHeight: '20em',

        '& a, & a:visited': {
          textDecoration: 'none',
          color: theme.colors.textWhite
        }
      },

      popUpContainer: {
        extend: [ theme.responsiveWidth(40) ],
        textAlign: 'center',
        zIndex: 2,
      },

      logos: {
        maxWidth: '15em'
      },

      popup: {
        height: '100%',

        /* Popup at the back, with no close button */
        '&:last-child': {
          boxShadow: 'none',
          zIndex: -1,
          [`& .${PopUp1.getClassName('body')}`]: {
            height: '100%',
            alignItems: 'center',
            '& img.logo': {
              height: '100%',
              '@media screen and (max-width: 500px)': { width: '80%' }
            }
          }
        },

        [`& .${PopUp1.getClassName('body')}`]: {
          height: '100%',
          padding: '1.8em 2em',
          '@media screen and (max-width: 500px)': { padding: '1.8em 0.5em' },
        }

      }

    })
  }

  return { renderCSS, renderHTML }

})
