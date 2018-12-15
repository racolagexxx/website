const { default: jss, sheets } = require('jss')
const cssClassesRegistry = require('~/registry-css-classes')
const componentRegistry = require('~/registry-static-components')

// Function for declaring static components.
//    - `filename`: the value of the `__filename` variable in the component file
//    - `closure`: a function `(helpers) => component`.
//
// e.g. :
//    declareStaticComponent(__filename, ({ getClassName, createStyleSheet }) => ({ 
//      renderHTML: (attrs) => `<div class="${getClassName()}"></div>
//      renderCSS: () => createStyleSheet({ '': { backgroundColor: 'red' } })
//    })
//
module.exports = function(filename, closure) {

  // Helper to generate class names in the component declaration closure.  
  const getClassName = cssClassesRegistry.getClassNameGenerator(filename)
  
  // Helper to create stylesheet in the component declaration closure.
  const createStyleSheet = function(styles) {
    const sheet = jss.createStyleSheet(styles, {
      generateClassName: getClassName
    }).attach()
    sheets.add(sheet)
    return sheet
  }

  // Call the closure that will dynamically create the component methods    
  const component = closure({ 
    getClassName, 
    createStyleSheet 
  })

  componentRegistry.register(filename, component)
  
  // Verify required component methods
  if (!component.renderCSS) throw new Error(`component ${filename} is missing renderCSS`)
  if (!component.renderHTML) throw new Error(`component ${filename} is missing renderHTML`)

  // Attach additional methods to the component
  Object.assign(component, { getClassName })
  
  return component
}