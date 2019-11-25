const PopUp2 = require('~/components/PopUp2.static')
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

          ${MediaPopUp.renderHTML(
            {
              title: 'on porn streaming sites',
              video: {
                sourceUrls: [
                'images/documentation/porn-video-release.mp4',
                'images/documentation/porn-video-release.webm'
                ]
              }
            }
          )}

          ${MediaPopUp.renderHTML(
            {
              title: 'through porn ad networks',
              image: { srcUrl: 'images/documentation/porn-ad-release.gif' }
            }
          )}

          ${PopUp2.renderHTML(
            { 
              'class': [ getClassName('popUpTinder') ], 
              title: 'we release on Tinder'
            }, `
            <a href="images/documentation/tinder-release.gif" target="_blank">
              ​<picture>
                <source
                  srcset="images/documentation/tinder-release-small.gif"
                  media="(max-width: 600px)"
                />
                <img src="images/documentation/tinder-release.gif" style="max-height:30vw;" />
              </picture>
            </a>
          `)}

          ${MediaPopUp.renderHTML(
            {
              title: 'we release by email',
              image: { srcUrl: 'images/documentation/email-release.gif' }
            }
          )}

          ${PopUp2.renderHTML(
            {}, `
              <p>
                <b>racolage</b> (French) : practice of forced seduction used to attract a potential customer (in the context of prostitution).
              </p>
              <br />
              <p>
                <b>racolage.xxx</b> is a record label that releases experimental music through spam email, porn streaming sites, tinder, and other spammy release channels...
              </p>

              <p>Follow our activity and get more info from our <a href="https://www.facebook.com/racolage/" target="_blank">facebook</a> and <a href="https://twitter.com/racolagexxx" target="_blank">twitter</a> pages.</p>
          `)}

        `)}
      </div>
    `
  }

  const renderCSS = function() {
    createStyleSheet({

      '': {
        extend: [ theme.centerFlexContent() ],
        justifyContent: 'flex-start',
        marginBottom: '7em',
        marginTop: '4em',
        '@media screen and (max-width: 500px)': {
          marginBottom: '5em',
          marginTop: 'auto',
        },
        [`& .${PopUp2.getClassName()}`]: {
          minHeight: '40vh',
        },
        [`& .${MediaPopUp.getClassName()}`]: {
          height: '50vh',
        }
      },

      popUpContainerInner: {
        width: '65%',
        height: '100%',
        '@media screen and (max-width: 500px)': {
          width: '75%',
        },
      },

      popUpTinder: {
        textAlign: 'center',
        [`& .${PopUp2.getClassName('body')}`]: {
          padding: 0
        }
      }

    })
  }

  return { renderCSS, renderHTML }

})
