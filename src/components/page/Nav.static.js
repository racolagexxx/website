const theme = require('~/theme')
const declareStaticComponent = require('~/declareStaticComponent')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {

    const liArray = (['about', 'releases']).map((item, i) => {
      const spans = item.split('').map(function(letter) {
        return `<span class="${getClassName('span')}">${letter}</span>`
      }).join('')
      return `
        <li class="${i === 0 ? 'left active': 'right'} ${getClassName('li')}">
          <a class="${getClassName('a')}" href="#${item}">${spans}</a>
        </li>
      `
    }).join('')

    return `
      <nav class="${getClassName()}">
        <ul class="nav nav-tabs" role="tablist">${liArray}</ul>
      </nav>
    `
  }

  const renderCSS = function() {
    const lateralOffset = '1.7%'
    createStyleSheet({
      li: {
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        width: '1em',
        borderRight: 'solid 0.15em transparent',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        '&.active': { borderColor: theme.colors.textRed },
        '&.left': { left: lateralOffset },
        '&.right': { right: lateralOffset },

        paddingRight: '1.2em',
        '& a': { 
          extend: [ theme.responsiveText(220, 0.5) ]
        },
        '@media screen and (min-width: 500px) and (max-width: 700px)': {
          paddingRight: '1em',
        },
        '@media screen and (max-width: 500px)': {
          paddingRight: '0',
        },
      },
      span: {
        display: 'inline-block',
      },
      a: {
        display: 'inline-block',
        width: 0,
        textTransform: 'lowercase',
        color: theme.colors.textRed,
        fontWeight: 'bold',
        lineHeight: '1em',
      }
    })
  }

  return { renderCSS, renderHTML }

})
