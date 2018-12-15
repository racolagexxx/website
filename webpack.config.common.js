const path = require('path')
const mode = process.env.NODE_ENV
if (!['production', 'development'].includes(mode))
  throw new Error(`invalid NODE_ENV ${mode}`)


module.exports = {
  mode, 

  // Doesn't seem to work
  stats: {
    children: false,
    colors: true,
  },

  // Polyfills node.__filename so we can have unique IDs for our components
  node: {
    __filename: true,
  },

  // Allows to import with absolute path, e.g. `require('~/components/Bla')` 
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    }
  },

  // Define loaders for different file extensions
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(jpg|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'base64-inline-loader?limit=1000&name=[name].[ext]'
      }
    ]
  },
  devtool: 'source-map'
}