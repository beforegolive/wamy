import { getStore } from './store'

export function connect(mapStateToData, mapDispatchToMethods){
	let store = getStore()
	let state = store.getState()
	let mapDispatchObj = mapDispatchToMethods && mapDispatchToMethods(store.dispatch) || {}
	let unSubscribe
	return function(target) {
		target.prototype.wrapperName = 'wrapper'
    target.prototype.getWrapperName = function() {
      return 'wrapper'
    }

    const onLoad = target.prototype.onLoad
		const onUnload = target.prototype.onUnload

    class Connector extends target {
      onLoad() {
				// have to do this for updating data from redux store
				this.setData(mapStateToData(state))

				unSubscribe = store.subscribe(()=>{
					this.setData(mapStateToData(state))
				})

        onLoad && onLoad.apply(this, arguments);
      }

			onUnload(){
				unSubscribe && unSubscribe()
				onUnload && onUnload.apply(this, arguments);
			}
    }

    Object.getOwnPropertyNames(target.prototype).forEach(key => {
			// 此处不能用 Connector.prototype[key]来判断的原因是：已继承了target。所以能访问到对应的属性方法
      if (!Connector.prototype.hasOwnProperty(key))
        Connector.prototype[key] = target.prototype[key]
    })

		Object.keys(mapDispatchObj).forEach(key => {
			Connector.prototype[key] = mapDispatchObj[key]
		})

    return Connector
  }
}
