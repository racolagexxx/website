const declareStaticComponent = require('~/declareStaticComponent')
const htmlHelpers = require('~/html-helpers')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(props, children) {

    const attrs = {
      'class': [ getClassName() ].concat(props.class || [])
    }

    return `
      <div ${htmlHelpers.renderAttributes(attrs)}>
        ${children}
      </div>
    `
  }

  const renderCSS = function() {

    createStyleSheet({
    })
  }

  return { renderCSS, renderHTML }

})
