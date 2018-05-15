import { put, takeEvery } from '../../lib/redux-saga'
import { reducer1Action, reducer2Action } from '../actions/index'

function* dispathTwoActions(action){
	console.log('====== action in saga:',action)
	yield put(reducer1Action())
	yield put(reducer2Action())
}

function* mySaga(){
	console.log('====== mySaga started')
	yield takeEvery('sagaAction', dispathTwoActions)
}

export default mySaga
