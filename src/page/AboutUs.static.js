const PopUp = require('../components/PopUp.static')
const MediaPopUp = require('../components/MediaPopUp.static')
const PopUpStack = require('../components/PopUpStack.static')
const theme = require('../theme')
const { component } = require('../base.static')

module.exports = component(__filename, ({ getClassName, createStyleSheet }) => {

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
              title: '... on porn streaming sites ...',
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
              title: '... through porn ad networks ...',
              image: { srcUrl: 'images/documentation/porn-ad-release.gif' }
            }
          )}

          ${PopUp.renderHTML(
            { variant: 'popup2', 'class': [ getClassName('popUpTinder') ] }, `
            <p>... we release on Tinder ...</p>
            <a href="images/documentation/tinder-release.gif" target="_blank">
              ​<picture>
                <source
                  srcset="images/documentation/tinder-release-small.gif"
                  media="(max-width: 600px)"
                />
                <img src="images/documentation/tinder-release.gif" style="max-height:33vw;" />
              </picture>
            </a>
          `)}

          ${MediaPopUp.renderHTML(
            {
              title: 'we release by email ...',
              image: { srcUrl: 'images/documentation/email-release.gif' }
            }
          )}

          ${PopUp.renderHTML(
            { variant: 'popup2' }, `
              <p>
                <b>racolage</b> (French) : practice of forced seduction used to attract a potential customer (in the context of prostitution).
              </p>
              <br />
              <p>
                <b>racolage.xxx</b> is a record label that releases experimental music through spam email, tinder, fake movie streams and other spammy release channels...
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
          marginBottom: 'auto',
          marginTop: 'auto',
        }
      },

      popUpContainerInner: {
        width: '65%',
        height: '100%'
      },

      popUpTinder: {
        textAlign: 'center'
      }

    })
  }

  return { renderCSS, renderHTML }

})
