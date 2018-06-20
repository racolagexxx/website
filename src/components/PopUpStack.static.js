const { renderAttrs, renderData, component } = require('../base.static')
const PopUp = require('./PopUp.static')
const theme = require('../theme')

module.exports = component(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(opts, children) {
    const props = {
      'class': (opts.class || []).concat([
        getClassName(),
      ]).join(' ')
    }

    return `
      <div ${renderAttrs(props)} ${renderData(opts, ['reverse', 'variant', 'autoResize'])}>
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
