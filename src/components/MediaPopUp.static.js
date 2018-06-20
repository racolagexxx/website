const { component } = require('../base.static')
const PopUp = require('./PopUp.static')


module.exports = component(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = (attrs) => {
    let mediaElement, titleElement = ''
    if (attrs.title)
      titleElement = `<p>${attrs.title}</p>`

    if (attrs.video) {
      const sourceElements = attrs.video.sourceUrls.map((sourceUrl) => {
        const extension = sourceUrl.split('.').slice(-1)[0]
        return `
          <source
            src="${sourceUrl}"
            type="video/${extension}"
          />
        `
      }).join('')

      mediaElement = `
        <video class="${getClassName('media')}" controls loop >
          ${sourceElements}
          Video not supported.
        </video>
      `
    } else if (attrs.image) {
      mediaElement = `
        <a href="${attrs.image.srcUrl}" target="_blank">
          <img class="${getClassName('media')}" src="${attrs.image.srcUrl}" />
        </a>
      `
    } else
      throw new Error('invalid attributes for media popup')

    return `
      ${PopUp.renderHTML(
        { variant: 'popup2', class: [ getClassName() ] }, `
        ${titleElement}
        ${mediaElement}
      `)}
    `
  }

  const renderCSS = () => {
    createStyleSheet({

      '': {
        textAlign: 'center',
      },

      media: {
        // Padding for making it easier to click on "close" button on small screen
        marginTop: '10px',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '80vh'
      }
    })
  }

  return { renderCSS, renderHTML }
})
