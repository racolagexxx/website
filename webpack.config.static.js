const path = require('path')
const webpack = require('webpack')
const CleanCSS = require('clean-css')
const minifyHTML = require('html-minifier').minify
const releases = require('./src/releases')

const webpackConfigCommon = require('./webpack.config.common')


// Paths of JS files
const JS_FILES = {
  classNameRegistry: 'js/classNameRegistry.js',
  app: 'js/app.js'
}

// Helper to render an HTML string from a `main` object
const renderHTML = (main, attrs) => {
  let renderedHTML = main.renderHTML(attrs)
  if (webpackConfigCommon.mode === 'production') {
    renderedHTML = minifyHTML(renderedHTML, {
      removeAttributeQuotes: true,
      removeComments: true,
      collapseWhitespace: true
    })
  }
  return renderedHTML
}

const renderCSS = (main) => {
  let renderedCSS = main.renderCSS().toString()
  if (webpackConfigCommon.mode === 'production') {
    renderedCSS = new CleanCSS({ level: 2 }).minify(renderedCSS)
    if (renderedCSS.errors.length)
      throw new Error(renderedCSS.errors.join('\n'))
    renderedCSS = renderedCSS.styles
  }
  return renderedCSS
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

class CompileHtmlAndCss {

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      let main

      // Render the HTML & CSS
      try {
        main = eval(compilation.assets['index.html.js'].source())

        // Create index.html with inlined CSS
        const renderedCSS = renderCSS(main)
        compilation.assets['index.html'] = makeAsset(
          renderHTML(main, { css: renderedCSS, JS_FILES })
        )

        // Add to the assets the JS file containing mangled class names
        // !!! `getCssClassesRegistry` must be ran after HTML and CSS are rendered
        // otherwise it's empty
        const classNameRegistry = main.getCssClassesRegistry()
        compilation.assets[JS_FILES.classNameRegistry] = makeAsset(
          `window.CLASS_NAME_REGISTERY = ${JSON.stringify(classNameRegistry)}`
        )

        // Compile the html for each release's details
        releases.forEach((release) => {
          main = eval(`
            global.CLASS_NAME_REGISTERY = ${JSON.stringify(classNameRegistry)};
            ${compilation.assets[release.jsFileName].source()}
          `)
          compilation.assets[release.htmlFileName] = makeAsset(
            renderHTML(main, release)
          )
        })

      } catch (err) {
        console.error(err)
        compilation.errors.push(err)
        this._deleteAssets(compilation)
        return callback()
      }
  
      // Delete / rename assets
      this._deleteAssets(compilation)
  
      callback()
    })
  }

  _deleteAssets(compilation) {
    deleteJsAsset(compilation, 'index.html.js')
    releases.forEach((release) => {
      deleteJsAsset(compilation, release.jsFileName)
    })
  }
  
}

// Build the list of entries
const entry = {
  'index.html': './src/main.index.html.js'
}
releases.forEach((release) => entry[release.entryName] = release.entryPath)

module.exports = {
  ...webpackConfigCommon,

  // We always pass mode = development to webpack otherwise it renders the files so that we can't
  // access the functions exported as `module.exports` on main file.
  // We use `webpackConfigCommon.mode` to decide what optimizations to turn on / off
  name: `static (mode = ${webpackConfigCommon.mode})`,
  mode: 'development',
  entry: entry,
  
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js'
  },

  plugins: [
    new CompileHtmlAndCss(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(webpackConfigCommon.mode)
    })    
  ]
}
