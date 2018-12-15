const cssClassesRegistry = require('~/registry-css-classes')

// Function for declaring JS components.
module.exports = (filename, closure) => {
  const getClassName = cssClassesRegistry.getClassNameGenerator(filename)
  const component = closure({ getClassName })
  return Object.assign(component, { getClassName })
}