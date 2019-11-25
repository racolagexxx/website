const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')
const PopUp = require('./PopUp.static')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function(props, children) {
    let titleElement = ''
    if (props.title)
      titleElement = `<div class="${getClassName('title')}">${props.title}</div>`

    const popupProps = {
      'class': [ getClassName() ].concat(props.class || [])
    }

    return `
      ${PopUp.renderHTML(popupProps, `
        <div class="${getClassName('header')}">
          ${titleElement}
          ${props.noClose ? '' : `<div class="close ${getClassName('close')}"></div>`}
        </div>
        <div class="${getClassName('body')}">
          ${children}
        </div>
      `)}
    `
  }

  const renderCSS = function() {
    const headerHeight = 2.2
    const closePadding = 0.2

    createStyleSheet({

      '': {
        extend: [ theme.centerFlexContent({ centerVertically: false }) ],
        
        backgroundColor: theme.colors.bgWhite,
        padding: `${headerHeight}em 0`,
        border: `${theme.colors.bgRed} solid 2px`,
        textAlign: 'left',
      },

      header: {
        position: 'absolute',
        height: `${headerHeight}em`,
        width: '100%',

        top: 0,
        left: 0,
        color: theme.colors.textRed
      },

      title: {
        position: 'absolute',
        width: '100%',
        right: `${headerHeight}em`,
        paddingLeft: `${headerHeight}em`,
        top: '50%',
        transform: 'translateY(-50%)'
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

        backgroundImage: "url('./images/close2.svg')"
      },

      body: {
        extend: [ theme.centerFlexContent({ centerVertically: false }) ],
        height: '100%',

        padding: '1em',
        '@media screen and (max-width: 450px) and (min-width: 0px)': {
          padding: '0 0.5em',
          fontSize: '80%'
        }
      }

    })
  }

  return { renderCSS, renderHTML }

})
