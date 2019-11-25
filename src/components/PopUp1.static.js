const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')
const PopUp = require('./PopUp.static')


module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(props, children) {

    const popUpProps = {
      class: [getClassName()].concat(props.class || [])
    }

    // Header must come second so close button appears above the body
    return `
      ${PopUp.renderHTML(popUpProps, `
        <div class="${getClassName('body')}">
          ${children}
        </div>
        <div class="${getClassName('header')}">
          ${props.noClose ? '' : `<div class="close ${getClassName('close')}"></div>`}
        </div>        
      `)}
    `
  }

  const renderCSS = function() {
    const headerHeight = 2.2
    const closePadding = 0.2
    const bodyPadding = 1

    createStyleSheet({

      '': {
        extend: [ theme.centerFlexContent({ centerVertically: false }) ],

        backgroundColor: theme.colors.bgRed,
        color: theme.colors.textWhite,
        padding: `${bodyPadding}em`,
        boxShadow: '8px 8px 1px rgba(118, 90, 118, 0.8)',
        textAlign: 'center',
      },

      header: {
        position: 'absolute',
        height: `${headerHeight}em`,
        width: '100%',

        top: `${bodyPadding}em`,
        right: `${bodyPadding}em`,
      },

      close: {
        position: 'absolute',
        top: `${closePadding}em`,
        right: `${closePadding}em`,
        height: `${headerHeight - 2 * closePadding}em`,
        width: `${headerHeight - 2 * closePadding}em`,
        background: "transparent no-repeat none right center",
        backgroundSize: 'auto 100%',
        cursor: 'pointer',

        backgroundImage: "url('./images/close1.svg')",
        opacity: 0.45
      },

      body: {
        extend: [ theme.centerFlexContent({ centerVertically: false }) ],
        height: '100%',

        padding: `${headerHeight}em 0`,
        border: `2px solid ${theme.colors.bgWhite}`
      },

    })
  }

  return { renderCSS, renderHTML }

})
