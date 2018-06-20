const path = require('path')
const fs = require('fs')
const CleanCSS = require('clean-css')
const minifyHTML = require('html-minifier').minify
const releases = require('./src/releases')

// Paths of JS files
const JSFiles = {
  classNameRegister: 'js/classNameRegister.js',
  app: 'js/app.js'
}

// Helper to render an HTML string from an `main` object
const renderHTML = (main, attrs) => {
  let renderedHTML = main.renderHTML(attrs)
  renderedHTML = minifyHTML(renderedHTML, {
    removeAttributeQuotes: true,
    removeComments: true,
    collapseWhitespace: true
  })
  return renderedHTML
}

// Helper to build an asset from a string
const makeAsset = (str) => {
  return {
    source: function() {
      return str
    },
    size: function() {
      return str.length
    }
  }
}

// Helper to delete a JS file and its source maps
const deleteJsAsset = (compilation, filename) => {
  delete compilation.assets[filename]
  delete compilation.assets[`${filename}.map`]
}

function CompileHtmlAndCss() {}
CompileHtmlAndCss.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    let main, classNameRegister

    const _deleteAssets = () => {
      deleteJsAsset(compilation, 'page.js')
      deleteJsAsset(compilation, 'app.js')
      releases.forEach((release) => {
        deleteJsAsset(compilation, release.jsFileName)
      })
    }

    // TODO : on production mode, assets will not build :/
    if (compilation.options.mode === 'development') {
      // Render the HTML & CSS
      try {
        main = eval(compilation.assets['page.js'].source())

        // Create index.html
        let renderedCSS = main.renderCSS().toString()
        renderedCSS = new CleanCSS({ level: 2 }).minify(renderedCSS)
        if (renderedCSS.errors.length)
          throw new Error(renderedCSS.errors.join('\n'))
        renderedCSS = renderedCSS.styles
        compilation.assets['index.html'] = makeAsset(
          renderHTML(main, { css: renderedCSS, JSFiles })
        )

        // Add to the assets the JS file containing mangled class names
        // !!! `getClassNameRegister` must be ran after HTML and CSS are rendered
        // otherwise it's empty
        classNameRegister = main.getClassNameRegister()
        compilation.assets[JSFiles.classNameRegister] = makeAsset(
          `window.CLASS_NAME_REGISTER = ${JSON.stringify(classNameRegister)}`
        )

        // Compile the html for each release's details
        releases.forEach((release) => {
          main = eval(`
            global.CLASS_NAME_REGISTER = ${JSON.stringify(classNameRegister)};
            ${compilation.assets[release.jsFileName].source()}
          `)
          compilation.assets[release.htmlFileName] = makeAsset(
            renderHTML(main, release)
          )
        })

      } catch (err) {
        console.error(err)
        compilation.errors.push(err)
        _deleteAssets()
        return callback()
      }
    }

    // Delete / rename assets
    compilation.assets[JSFiles.app] = compilation.assets['app.js']
    compilation.assets[`${JSFiles.app}.map`] = compilation.assets['app.js.map']
    _deleteAssets()

    callback()
  })
}

// Build the list of entries
const entry = {
  app: './src/index.js',
  page: './src/index.static.js'
}
releases.forEach((release) => entry[release.entryName] = release.entryPath)

module.exports = {
  entry: entry,

  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  },

  // Polyfills node.__filename so we can have unique ides for our components
  node: {
    __filename: true,
  },

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
  devtool: 'source-map',
  plugins: [
    new CompileHtmlAndCss()
  ]
}
