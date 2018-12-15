const COMPONENT_REGISTRY = {}

exports.register = (filename, component) => {
  COMPONENT_REGISTRY[filename] = component
}

exports.getRegistry = () => {
  return Object.assign({}, COMPONENT_REGISTRY)
}