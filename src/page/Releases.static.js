const Release = require('../components/Release.static')
const { component } = require('../base.static')
const releases = require('../releases.js')

module.exports = component(__filename, ({ getClassName, createStyleSheet }) => {

  const renderHTML = function() {
    const releasesRendered = releases.map((release) => Release.renderHTML(release)).join('')
    return `
      <div class="${getClassName()}">
        <h2><span><span>Releases</span></span></h2>
        <div class="${getClassName('container')}">${releasesRendered}</div>
      </div>
    `
  }

  const renderCSS = function() {
    createStyleSheet({
      container: {
        textAlign: 'center'
      }
    })
  }

  return { renderCSS, renderHTML }

})
