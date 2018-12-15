const declareStaticComponent = require('~/declareStaticComponent')
const htmlHelpers = require('~/html-helpers')
const PopUp = require('./PopUp.static')
const theme = require('~/theme')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(opts, children) {
    const props = {
      'class': (opts.class || []).concat([
        getClassName(),
      ]).join(' ')
    }

    return `
      <div ${htmlHelpers.renderAttributes(props)} ${htmlHelpers.renderDataAttributes(opts, ['reverse', 'variant', 'autoResize'])}>
        ${opts.resetButton ? `<div class="${getClassName('reset')}">
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
          '&:first-child': { position: 'static' }
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
