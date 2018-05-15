import myComopnent from '../../lib/myComponent.js'
import { reducer1Action } from '../../reduxRelated/actions/index'

const app = getApp()
const store = app.store
const state = store.getState()
console.log('======== state: ', state)

Page({
  data:{
    myName:'123',
    valueOfReducer1: !!getApp().store.getState().reducer1.switchValue
  },

  clickButton:() => {
    const action = reducer1Action()
    store.dispatch(action)
    console.log('====== switchValue:', store.getState().reducer1.switchValue)
  },

  onLoad(){
    this.unSubscribe = store.subscribe(()=>{
      this.setData({
        valueOfReducer1: store.getState().reducer1.switchValue
      })
    })

    this.setData({
      valueOfReducer1: store.getState().reducer1.switchValue
    })

    console.log('========== store.getState():', store.getState())
  },

  onUnload(){
    this.unSubscribe()
  }
})
