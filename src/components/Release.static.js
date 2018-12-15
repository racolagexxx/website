const htmlHelpers = require('~/html-helpers')
const LazyImage = require('./LazyImage.static')
const ReleaseDetails = require('./ReleaseDetails.static')
const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const IMG_WIDTH_VW = 25

  const renderHTML = function(d) {
    const imgRatio = d.picture.dimensions[0] / d.picture.dimensions[1]
    const imgStyle = {
      width: '100%',
      height: `${IMG_WIDTH_VW / imgRatio}vw`
    }
    const releaseStyle = {}

    const getRandomNumber = () => (Math.random() * 2).toString().slice(0, 4)

    const horizontalOffset = getRandomNumber()
    if (Math.random() > 0.5)
      releaseStyle.left = `${horizontalOffset}%`
    else releaseStyle.right = `${horizontalOffset}%`

    const verticalOffset = getRandomNumber()
    if (Math.random() > 0.5)
      releaseStyle.bottom = `${verticalOffset}em`
    else releaseStyle.top = `${verticalOffset}em`

    return `
      <div
        class="${getClassName()}"
        style="${htmlHelpers.renderStyle(releaseStyle).toString()}"
      >
        <div class="${getClassName('subtitle')}">released ${d.date}</div>
        <div class="${getClassName('subtitle')}">${d.channelsDisplay}</div>
        <div class="${getClassName('picture')}">
          ${LazyImage.renderHTML({
            src: d.picture.srcUrl,
            placeholderSrc: 'images/logo2.svg',
            style: htmlHelpers.renderStyle(imgStyle).toString()
          })}
        </div>
        <div class="${getClassName('title')}">
          <span class="${getClassName('releaseId')}">#${d.id}</span> ${d.title}
        </div>
        ${ReleaseDetails.renderHTML(d)}
      </div>
    `
  }

  const renderCSS = function() {

    createStyleSheet({
      '': {
        width: `${IMG_WIDTH_VW}vw`,
        height: 'auto',
        display: 'inline-block',
        position: 'relative',
        margin: '3em',
        cursor: 'pointer',
        zIndex: 1,

        [`@media screen and (max-width: ${theme.mobileLayoutWidthThreshold}px)`]: {
          margin: '2em',
          display: 'block',
          bottom: '0 !important',
          top: '0 !important',
          left: '0 !important',
          right: '0 !important',
          /* Override dimensions and offsets applied with JavaScript for free grid layout */
          width: 'auto !important',
          [`& .${getClassName('picture')} img`]: {
            height: 'auto !important'
          }
        },
        '@media screen and (min-width: 500px) and (max-width: 700px)': { margin: '0.5em' },
      },

      subtitle: {
        textAlign: 'right',
        color: theme.colors.textRed,
        '@media screen and (min-width: 500px) and (max-width: 700px)': { fontSize: '80%' }
      },

      title: {
        textAlign: 'center',
        color: theme.colors.textRed,
        fontSize: '230%',
        '@media screen and (max-width: 700px)': { fontSize: '150%' },
        position: 'relative',
        bottom: '0.55em'
      },

      picture: {
        '& >img': {
          width: '100%',
          border: `solid 4px ${theme.colors.bgWhite}`,
          '&:hover': {
            borderColor: theme.colors.bgRed
          }
        }
      },

      releaseId: {
        fontSize: '80%'
      }
    })
  }

  return { renderCSS, renderHTML }
})
