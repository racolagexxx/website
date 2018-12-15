// The registry is used to associate a full classname with a shorter "mangled" classname
// at compile time :
//
//    { <full class name>: <mangled> }
//
// Our compile process generates a version of the registry which we load
// directly on the client as a separate js file. 
const CLASS_NAME_REGISTERY = global.CLASS_NAME_REGISTERY || {}

// This is used internally by components to get / set class names, but also 
// passed as a hook to jss to generate css rules (hence the strange implementation).   
exports.getClassNameGenerator = function(forFilename) {

  const componentName = (forFilename)
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

    // In production, mangle `className` and add to the registry
    if (process.env.NODE_ENV === 'production') {
      let mangled = CLASS_NAME_REGISTERY[className]
      if (!mangled)
        mangled = CLASS_NAME_REGISTERY[className] = 'c'+(Object.keys(CLASS_NAME_REGISTERY).length).toString()

      return mangled
    } else {
      return className
    }
  }
}

exports.getRegistry = () => {
  return Object.assign({}, CLASS_NAME_REGISTERY)
}