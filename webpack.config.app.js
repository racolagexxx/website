const path = require('path')

const webpackConfigCommon = require('./webpack.config.common')


module.exports = {
  ...webpackConfigCommon,
  name: 'app',
  entry: './src/main.app.js',
  
  output: {
    path: path.resolve(__dirname, 'docs', 'js'),
    filename: 'app.js'
  }
}
