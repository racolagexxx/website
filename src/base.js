class BaseComponent {}

BaseComponent.getClassName = function() { throw new Error('Not implemented') }

exports.BaseComponent = BaseComponent

exports.loadImage = function(imgSrc) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image()
    imgElement.onload = resolve.bind(this, imgElement)
    imgElement.src = imgSrc
  })
}

const CLASS_NAME_REGISTER = global.CLASS_NAME_REGISTER || {}

const createGenerateClassName = exports.createGenerateClassName = function(filename) {

  const componentName = (filename)
    .split('/').slice(-1)[0]
    .replace('static', '')
    .replace(/\W/g, '')

  return (rule) => {

    // Shorthand to get the class name of the root element of the component:
    // e.g. : getClassName()
    rule = rule || componentName

    let className
    // This is for `generateClassName` option from JSS, to define class names
    if (typeof rule.key === 'string') {

      // Empty string is a shorthand to define class for the root element of the component
      if (rule.key === '')
        className = `${componentName}-${componentName}`

      else
        className = `${componentName}-${rule.key}`

    // This is for our utils to get class names
    } else
      className = `${componentName}-${rule}`

    // Register the mangled class name
    let mangled = CLASS_NAME_REGISTER[className]
    if (!mangled)
      mangled = CLASS_NAME_REGISTER[className] = 'c'+(Object.keys(CLASS_NAME_REGISTER).length).toString()

    return mangled
  }
}

// Helper to attach create components
exports.component = (filename, closure) => {
  const getClassName = createGenerateClassName(filename)
  return Object.assign(closure({ getClassName }), { getClassName })
}

exports.getClassNameRegister = () => {
  return Object.assign({}, CLASS_NAME_REGISTER)
}

exports.fetchHTML = (url) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    req.onreadystatechange = function() {
      if (this.readyState == 4){
        resolve(this.responseText)
      }
    }
    req.open('GET', url, true)
    req.send()
  })
}
