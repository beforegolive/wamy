const createPage = (className, path) => {
  var instance = new className()

  Object.getOwnPropertyNames(className.prototype).forEach(key => {
		if (key !== 'constructor'){
			instance[key] = className.prototype[key]
		}
  })
  return instance
}

export default {
  _createPage: createPage
}
