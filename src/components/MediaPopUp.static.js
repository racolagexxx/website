const declareStaticComponent = require('~/declareStaticComponent')
const PopUp2 = require('./PopUp2.static')


module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = (props) => {
    let mediaElement

    if (props.video) {
      const sourceElements = props.video.sourceUrls.map((sourceUrl) => {
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
    } else if (props.image) {
      mediaElement = `
        <a class="${getClassName('mediaLink')}" href="${props.image.srcUrl}" target="_blank">
          <img class="${getClassName('media')}" src="${props.image.srcUrl}" />
        </a>
      `
    } else
      throw new Error('invalid attributes for media popup')

    return `
      ${PopUp2.renderHTML(
        { class: [ getClassName() ], title: props.title }, `
        ${mediaElement}
      `)}
    `
  }

  const renderCSS = () => {
    createStyleSheet({

      '': {
        textAlign: 'center',
        [`& .${PopUp2.getClassName('body')}`]: {
          padding: 0,
        },
      },

      mediaLink: {
        height: '100%'
      },

      media: {
        maxHeight: '100%',
        maxWidth: '100%',
      }

    })
  }

  return { renderCSS, renderHTML }
})
