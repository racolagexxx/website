const declareStaticComponent = require('~/declareStaticComponent')
const PopUp = require('./PopUp.static')

module.exports = declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = (attrs) => {
    const rows = attrs.table.map(([ th, td ]) => {
      return `<tr><th>${th}</th><td>${td}</td></tr>`
    }).join('')

    return `
      ${PopUp.renderHTML(
        { variant: 'popup2', 'class': [ getClassName() ] }, `
        <h4 class="${getClassName('title')}">Analytics</h4>
        <table class="${getClassName('table')}">
          ${rows}
        </table>
        <p>stats date : ${attrs.date}</p>
      `)}
    `
  }

  const renderCSS = () => {
    createStyleSheet({
      '': {},

      title: {
        fontSize: '100%',
        marginLeft: '0.3em',
        textAlign: 'left'
      },

      table: {
        '& th': {
          paddingRight: '0.5em'
        }
      }

    })
  }

  return { renderHTML, renderCSS }

})
