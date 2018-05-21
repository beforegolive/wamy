import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers/index'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'

const configureStore = (initialState) => {
	const sagaMiddleware = createSagaMiddleware()
	const enhancer = applyMiddleware(thunk, sagaMiddleware)
	const store = createStore(reducers, enhancer)

	sagaMiddleware.run(rootSaga)
	return store
}

export default configureStore
