const BackgroundCanvas = require('~/components/BackgroundCanvas.static')
const PopUp = require('~/components/PopUp.static')
const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {
    return `
      <footer class="${getClassName()}">

        ${BackgroundCanvas.renderHTML({ squareSize: 0.04, range: 0.2, scrambleCount: 20 })}

        <div class="${getClassName('popUpContainer')}">

          ${PopUp.renderHTML(
            { variant: 'popup1', noClose: true }, `
            <div class="${getClassName('popUpInner')}">
              <ul class="menu">
                <li><a href="#about">__About</a></li>
                <li><a href="#releases">Releases</a></li>
              </ul>
              <div class="logo">
                <img src="images/logo.svg">
              </div>
              <div class="socialMedia">
                <a href="https://www.facebook.com/racolage/" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                <a href="https://twitter.com/racolagexxx" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></i></a>
                <a href="mailto:racolagexxx@protonmail.com" target="_blank"><i class="fa fa-envelope" aria-hidden="true"></i></a>
              </div>
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
            width: '6em'
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
