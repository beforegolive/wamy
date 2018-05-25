const createPage = (className, path) => {
  var instance = new className()

	// ES class中定义的方法会被附加在类的prototype上，因此要把方法抽出来放到当前实例上
  Object.getOwnPropertyNames(className.prototype).forEach(key => {
		if (key !== 'constructor'){
			instance[key] = className.prototype[key]
		}
  })

	console.log('======= instance:', instance)

  return instance
}

export default createPage
