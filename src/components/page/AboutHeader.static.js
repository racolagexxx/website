const declareStaticComponent = require('~/declareStaticComponent')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {
    return `
      <h2 class="${getClassName()}"><span><span>About</span></span></h2>
    `
  }

  const renderCSS = function() {
    createStyleSheet({
      '': {
        marginBottom: '1.5em'
      }
    })
  }

  return { renderCSS, renderHTML }

})
