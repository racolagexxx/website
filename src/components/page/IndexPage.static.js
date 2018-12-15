const stepsWoff2 = require('~/fonts/steps-mono-thin-webfont.woff2')
const stepsWoff = require('~/fonts/steps-mono-thin-webfont.woff')

const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')

const Nav = require('./Nav.static')
const Header = require('./Header.static')
const Releases = require('./Releases.static')
const AboutHeader = require('./AboutHeader.static')
const BestQuotes = require('./BestQuotes.static')
const AboutUs = require('./AboutUs.static')
const AboutManifesto = require('./AboutManifesto.static')
const Footer = require('./Footer.static')


module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(attrs) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <title>racolage.xxx</title>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="${attrs.JS_FILES.classNameRegistry}" type="text/javascript"></script>
          <script src="${attrs.JS_FILES.app}" type="text/javascript"></script>
          <link rel="shortcut icon" type="image/png" href="images/favicon.ico"/>
          <link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
          <style>${attrs.css}</style>
        </head>
        <body>

          ${Nav.renderHTML()}

          ${Header.renderHTML()}

          <div id="releases"></div>
          ${Releases.renderHTML()}

          ${BestQuotes.renderHTML()}

          <div id="about"></div>
          ${AboutHeader.renderHTML()}
          ${AboutUs.renderHTML()}
          ${AboutManifesto.renderHTML()}

          ${Footer.renderHTML()}

          <!--<script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-17637518-5', 'auto');
            ga('send', 'pageview');
          </script>-->

        </body>
      </html>
    `
  }

  const renderCSS = function() {
    createStyleSheet({

      '@global': {
        '*': {
          boxSizing: 'border-box'
        },

        'body, html': {
          margin: '0',
          padding: '0',
          width: '100%',
          height: '100%',
          backgroundColor: theme.colors.bgWhite,
          fontFamily: 'steps-monomono_thin'
        },

        button: {
          fontFamily: 'steps-monomono_thin',
          border: `${theme.colors.bgRed} 2px solid`,
          background: theme.colors.bgWhite,
          color: theme.colors.textRed,
          padding: '1em 3em',
          fontSize: '100%',
          cursor: 'pointer',
        },

        ul: {
          listStyle: 'none',
          padding: 0,
          margin: 0,
        },

        h1: {
          extend: [ theme.responsiveText(160, 0.5) ]
        },

        'h2, h3, h4': {
          extend: [ theme.responsiveText(350, 0.6) ],
          color: theme.colors.textRed,
          textAlign: 'center',
          padding: '0',
          margin: '0.5em',
          marginTop: '1em',
          fontSize: '350%',

          '& >span': {
            textTransform: 'uppercase',
            borderLeft: `solid 0.1em ${theme.colors.textRed}`,
            '& >span': {
              position: 'relative',
              bottom: '0.1em',
              left: '0.3em',
            }
          }
        }

      },

      '@font-face': {
        fontFamily: 'steps-monomono_thin',
        src: `url(${stepsWoff2}) format('woff2'),
             url(${stepsWoff}) format('woff')`,
        fontWeight: 'normal',
        fontStyle: 'normal'
      }

    })
  }

  return { renderCSS, renderHTML }
})
