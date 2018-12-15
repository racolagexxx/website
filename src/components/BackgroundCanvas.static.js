const declareStaticComponent = require('~/declareStaticComponent')
const htmlHelpers = require('~/html-helpers')
const theme = require('~/theme')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(attrs) {
    return `
      <canvas
        class="${getClassName()}"
        ${ htmlHelpers.renderDataAttributes(attrs, ['squareSize', 'range', 'scrambleCount'])}
      >
      </canvas>
    `
  }

  const renderCSS = function() {
    createStyleSheet({
      '': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.bgPurple
      }
    })
  }

  return { renderCSS, renderHTML }

})
