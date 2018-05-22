import { getStore } from './store'

export function connect(mapStateToData, mapDispatchToMethods){
	let store = getStore()
	let state = store.getState()
	let unSubscribe
	return function(target) {
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
      if (Connector.prototype[key] === undefined)
        Connector.prototype[key] = target.prototype[key]
    })

		Object.keys(mapDispatchToMethods).forEach(key => {
			Connector.prototype[key] = mapDispatchToMethods[key]
		})

    return Connector
  }
}
