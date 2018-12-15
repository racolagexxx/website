const webpack = require('webpack')
const webpackConfigApp = require('./webpack.config.app')
const webpackConfigStatic = require('./webpack.config.static')
const webpackConfigCommon = require('./webpack.config.common')

const compiler = webpack([
  webpackConfigStatic,
  webpackConfigApp
]);

const printReport = (err, stats) => {

  if (err) {
    console.error(err)

  } else if (stats.hasErrors()) {
    console.error(stats.toString())
    
  } else {
    stats.stats.forEach(({ compilation, startTime, endTime }) => {
      console.log(`\n---------------------------------------< ${compilation.name}`)
      console.log(`  duration : ${(endTime - startTime) / 1000} s`)
      console.log(`  mode : ${compilation.options.mode}`)
      Object.keys(compilation.assets).forEach((assetName) => {
        console.log(`    -> ${assetName}`)
      })
    })
  }

}

if (webpackConfigCommon.mode === 'development') {
  compiler.watch({
    aggregateTimeout: 300,
    poll: undefined
  }, printReport)

} else {
  compiler.run(printReport)
}
