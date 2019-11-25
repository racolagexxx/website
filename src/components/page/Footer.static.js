const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')
const BackgroundCanvas = require('~/components/BackgroundCanvas.static')
const PopUp1 = require('~/components/PopUp1.static')
const SocialMedia = require('./SocialMedia.static')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {
    return `
      <footer class="${getClassName()}">

        ${BackgroundCanvas.renderHTML({ squareSize: 0.04, range: 0.2, scrambleCount: 20 })}

        <div class="${getClassName('popUpContainer')}">

          ${PopUp1.renderHTML(
            { noClose: true }, `
            <div class="${getClassName('popUpInner')}">
              <ul class="menu">
                <li><a href="#about">__About</a></li>
                <li><a href="#releases">Releases</a></li>
              </ul>
              <div class="logo">
                <img src="images/logo.svg">
              </div>
              ${SocialMedia.renderHTML()}
            </div>
          `)}

        </div>
      </footer>
    `
  }

  const renderCSS = function() {
    createStyleSheet({
      '': {
        extend: [ theme.centerFlexContent() ],
        height: '20em',
        marginTop: '2em',

        '& a, & a:visited': {
          color: theme.colors.textWhite,
          textDecoration: 'none'
        },

        '& ul': {
          whiteSpace: 'nowrap'
        },

        '& li': {
          display: 'inline-block',
          '&:first-child': {
            borderRight: `1px solid ${theme.colors.textWhite}`,
            paddingRight: '0.5em',
            marginRight: '0.5em',
          }
        },

        [`& .${PopUp1.getClassName('body')}`]: {
          padding: '1.8em 0'
        }
      },

      popUpContainer: {
        extend: [ theme.responsiveWidth(30) ],
        textAlign: 'center',
        zIndex: 2,
      },

      popUpInner: {
        fontSize: '130%',
        '@media screen and (max-width: 650px) and (min-width: 450px)': { fontSize: '105%' },
        '@media screen and (max-width: 450px)': { fontSize: '90%' },

        '& .logo': {
          marginTop: '0.5em',
          '& img': {
            width: '9em'
          }
        },

        '& .socialMedia': {
          fontSize: '180%'
        }
      }

    })
  }

  return { renderCSS, renderHTML }

})
