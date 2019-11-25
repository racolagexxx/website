const declareStaticComponent = require('~/declareStaticComponent')
const htmlHelpers = require('~/html-helpers')
const PopUp = require('./PopUp.static')
const theme = require('~/theme')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(props, children) {
    const htmlAttrs = {
      'class': [getClassName()].concat(props.class || [])
    }

    return `
      <div ${htmlHelpers.renderAttributes(htmlAttrs)} ${htmlHelpers.renderDataAttributes(props, ['reverse', 'variant', 'autoResize'])}>
        ${props.resetButton ? `<div class="${getClassName('reset')}">
          <button>READ AGAIN</button>
        </div>`: ''}
        ${children}
      </div>
    `
  }

  const renderCSS = function() {
    createStyleSheet({

      '': {
        position: 'relative',

        [`& .${PopUp.getClassName()}`]: {
          position: 'absolute',
          width: '100%',
          top: '0px',
          '&:first-child': { position: 'relative' }
        }
      },

      reset: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        '& button': {
          position: 'relative',
          top: '3em'
        }
      }

    })
  }

  return { renderCSS, renderHTML }

})
