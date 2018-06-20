const { default: jss, sheets } = require('jss')

const base = require('./base')

exports.renderAttrs = (props) => {
  return Object.entries(props)
    .map(([ key, value ]) => `${key}="${value}"`).join(' ')
}

exports.renderData = (obj, keys) => {
  return Object.entries(obj)
    .filter(([ key, value ]) => keys.includes(key))
    .map(([ key, value ]) => `data-${key.toLowerCase()}="${value}"`).join(' ')
}

exports.toCSS = function(style) {
  return Object.entries(style).map(([ key, value ]) => `${key}:${value}`).join(';')
}

// Helper to attach create components
exports.component = function(filename, closure) {
  const getClassName = base.createGenerateClassName(filename)
  const instance = Object.assign(closure({
    getClassName,

    createStyleSheet: function(styles) {
      const sheet = jss.createStyleSheet(styles, {
        generateClassName: getClassName
      }).attach()
      sheets.add(sheet)
      return sheet
    }

  }), { getClassName })

  COMPONENT_REGISTRY[filename] = instance
  return instance
}

exports.getAllComponents = () => {
  return Object.assign({}, COMPONENT_REGISTRY)
}

const COMPONENT_REGISTRY = {}

module.exports = Object.assign({}, base, exports)
