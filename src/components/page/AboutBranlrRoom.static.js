const PopUp = require('~/components/PopUp.static')
const MediaPopUp = require('~/components/MediaPopUp.static')
const PopUpStack = require('~/components/PopUpStack.static')
const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {
    return `
      <div class="${getClassName()}">

        ${PopUpStack.renderHTML(
          {
            'class': [ getClassName('popUpContainerInner') ],
            variant: 'messy',
            resetButton: true,
            autoResize: true
          }, `

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <iframe
              width="100%" height="auto"
              src="https://www.youtube.com/embed/8Jm1DFBuHEo"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          `)}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
            <iframe
              width="100%" height="auto"
              src="https://www.youtube.com/embed/JlmTl4iXbgA"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
            ></iframe>
          `)}

          ${PopUp.renderHTML(
            { variant: 'popup2', class: [getClassName('branlrRoomPresentation')] }, `
            <img src="images/branlr-room/branlr-room-logo.png"/>
            <p>
              <b>Branlr Room</b> is a new series of live music shows by racolage.xxx, broadcasted exclusively on sex cam websites.

            "branleur" is the French word for 👐⚓️
              
            Check-out our <a href="https://www.youtube.com/channel/UCN6VdLnpng_TiDYFbvVhFzg">YouTube channel</a>.
            </p>
          `)}

        `)}
      </div>
    `
  }

  const renderCSS = function() {
    createStyleSheet({

      '': {
        extend: [ theme.centerFlexContent() ],
        marginBottom: '2em',
        [`& .${MediaPopUp.getClassName('media')}`]: {
          maxHeight: '33vh'
        }
      },

      popUpContainerInner: {
        width: '69%',
        height: '100%'
      },

      branlrRoomPresentation: {
        '& .content': {
          display: 'flex',
          alignItems: 'center',
          '& img': {
            marginRight: '2em',
            width: '30em'
          },
          '@media screen and (max-width: 600px)': { 
            flexDirection: 'column',
            '& img': {
              marginRight: '0',
              width: '100%'
            }
          },
        }
      }

    })
  }

  return { renderCSS, renderHTML }

})
