const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')
const htmlHelpers = require('~/html-helpers')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(opts, children) {
    const attrs = {
      'class': ([
        getClassName(),
        getClassName(opts.variant)
      ]).concat(opts.class || []).join(' ')
    }

    return `
      <div ${htmlHelpers.renderAttributes(attrs)}>
        <div class="container ${getClassName('container')}">
          ${opts.noClose ? '' : `<div class="close ${getClassName('close')}"></div>`}
          <div class="content">${children}</div>
        </div>
      </div>
    `
  }

  const renderCSS = function() {
    const closeBarHeight = 2.2
    const closePadding = 0.2

    createStyleSheet({

      '': {},

      container: {
        extend: [ theme.centerFlexContent({ centerVertically: false }) ],
        padding: '1.8em 0',
      },

      close: {
        position: 'absolute',
        top: `${closePadding}em`,
        right: `${closePadding}em`,
        height: `${closeBarHeight - 2 * closePadding}em`,
        width: `${closeBarHeight - 2 * closePadding}em`,
        background: "transparent no-repeat none right center",
        backgroundSize: 'auto 100%',
        cursor: 'pointer'
      },

      popup1: {
        backgroundColor: theme.colors.bgRed,
        color: theme.colors.textWhite,
        padding: '1em',
        boxShadow: '8px 8px 1px rgba(118, 90, 118, 0.8)',
        textAlign: 'center',

        '& .container': {
          border: `2px solid ${theme.colors.bgWhite}`
        },

        '& .container .close': {
          backgroundImage: "url('./images/close1.svg')",
          opacity: 0.45
        }

      },

      popup2: {
        backgroundColor: theme.colors.bgWhite,
        border: `${theme.colors.bgRed} solid 2px`,
        textAlign: 'left',

        '& .content': {
          padding: '1em',
          '@media screen and (max-width: 450px) and (min-width: 0px)': {
            padding: '0 0.5em',
            fontSize: '80%'
          }
        },

        '& .container .close': {
          backgroundImage: "url('./images/close2.svg')"
        }

      }

    })
  }

  return { renderCSS, renderHTML }

})
