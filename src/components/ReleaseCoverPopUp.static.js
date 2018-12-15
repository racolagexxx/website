const declareStaticComponent = require('~/declareStaticComponent')
const PopUp = require('./PopUp.static')
const theme = require('~/theme')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = (attrs) => {
    return `
      ${PopUp.renderHTML({ variant: 'popup1', 'class': [ getClassName() ] }, `
        <div class="${getClassName('title')}">
          <span class="${getClassName('releaseId')}">#${attrs.id}</span>
          ${attrs.title}
        </div>
        <div class="${getClassName('text')}">${attrs.text}</div>
        <div class="${getClassName('dateAndChannels')}">released ${attrs.date}</div>
        <div class="${getClassName('dateAndChannels')}">${attrs.channelsDisplay}</div>
      `)}
    `
  }

  const renderCSS = () => {
    const padding = 1
    const fontRatio = 0.8

    createStyleSheet({

      '': {
        textAlign: 'left'
      },

      title: {
        color: theme.colors.textWhite,
        padding: `${padding}em`,
        paddingTop: '0',
        fontSize: '125%',
      },

      dateAndChannels: {
        paddingLeft: `${padding / fontRatio}em`,
        color: theme.colors.textWhite,
        textAlign: 'left',
        fontSize: `${100 * fontRatio}%`
      },

      text: {
        padding: `${padding}em`,
        paddingTop: '0'
      },

      releaseId: {
        fontSize: '80%'
      }

    })
  }

  return { renderHTML, renderCSS }

})
