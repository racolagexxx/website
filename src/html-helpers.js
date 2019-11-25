exports.renderAttributes = (props) => {
  return Object.entries(props)
    .map(([ key, value ]) => {
      if (key === 'class') {
        value = (value || []).join(' ')
      }
      return `${key}="${value}"`
    }).join(' ')
}

exports.renderDataAttributes = (obj, keys) => {
  return Object.entries(obj)
    .filter(([ key, value ]) => keys.includes(key))
    .map(([ key, value ]) => `data-${key.toLowerCase()}="${value}"`).join(' ')
}

exports.renderStyle = function(style) {
  return Object.entries(style).map(([ key, value ]) => `${key}:${value}`).join(';')
}