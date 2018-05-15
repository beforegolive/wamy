import { createStore, applyMiddleware, compose } from '../../lib/redux'
import reducers from '../reducers/index'
import thunk from '../../lib/redux-thunk'
import createSagaMiddleware from '../../lib/redux-saga'
// import rootSaga from '../sagas/index'

const configureStore = (initialState) => {
	const sagaMiddleware = createSagaMiddleware()
	const enhancer = applyMiddleware(thunk, sagaMiddleware)
	const store = createStore(reducers, enhancer)

	// sagaMiddleware.run(rootSaga)

	return store
}

export default configureStore
