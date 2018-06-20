const releases = require('./releases.json')

releases.forEach(function(releaseData) {

  releaseData.channelsDisplay = releaseData.channels.map(function(channel) {
    if (channel[0] === 'email')
      return '' + channel[1] + ' emails'
    else
      return channel.join(' ')
  }).join(', ')

  releaseData.channelsDisplay += ' ' + releaseData.tags
    .map(function(t) { return '[' + t + ']' }).join(' ')

  releaseData.title.replace('-', '–')

  // Attach JS and HTML file names

  // Entry
  releaseData.entryName = `release-details-${releaseData.id}`
  releaseData.entryPath = `./src/releases/${releaseData.id}.static.js`

  // Output
  releaseData.jsFileName = `${releaseData.entryName}.js`
  releaseData.staticDir = `releases/${releaseData.id}`
  releaseData.picture.srcUrl = `${releaseData.staticDir}/cover.${releaseData.picture.filetype}`
  releaseData.htmlFileName = `${releaseData.staticDir}/index.html`
})

module.exports = releases
