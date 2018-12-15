const declareStaticComponent = require('~/declareStaticComponent')
const theme = require('~/theme')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(attrs) {
    return `
      <img
        class="${getClassName()}"
        src="${attrs.placeholderSrc}"
        style="${attrs.style || ''}"
        data-src="${attrs.src}"
      />
    `
  }

  const renderCSS = function() {
    createStyleSheet({
      '': {
        backgroundColor: theme.colors.bgGrey
      }
    })
  }

  return { renderCSS, renderHTML }

})
