// pages/reduxPage/index.js
import { reducer2Action, thunkAction, sagaAction } from '../../reduxRelated/actions/index'
const app = getApp()
const store = app.store
console.log('=== reducer1:', store.getState().reducer1.switchValue)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    valueOfReducer1: !!getApp().store.getState().reducer1.switchValue,
    valueOfReducer2: !!getApp().store.getState().reducer2.switchValue
  },

  clickButton(){
    const action = reducer2Action()
    store.dispatch(action)
    console.log('====== reducer2 switchValue:', store.getState().reducer2.switchValue)
  },

  changeReducer1(){
    const action = { type: 'reducer1_action1'}
    store.dispatch(action)
    console.log('====== reducer1 switchValue:', store.getState().reducer1.switchValue)
  },

  changeTwoReducers(){
    const action = thunkAction()
    store.dispatch(action)
    console.log('====== reducer1 switchValue:', store.getState().reducer1.switchValue)
    console.log('====== reducer2 switchValue:', store.getState().reducer2.switchValue)
  },

  changeTwoReducersWithSaga() {
    const action = sagaAction()
    store.dispatch(action)
    console.log('======Saga reducer1 switchValue:', store.getState().reducer1.switchValue)
    console.log('======Saga reducer2 switchValue:', store.getState().reducer2.switchValue)
  },

  onLoad: function (options) {
    this.unSubscribe = store.subscribe(()=>{
      this.setData({
        valueOfReducer1: store.getState().reducer1.switchValue,
        valueOfReducer2: store.getState().reducer2.switchValue
      })
    })

    this.setData({
      valueOfReducer1: store.getState().reducer1.switchValue,
      valueOfReducer2: store.getState().reducer2.switchValue
    })
  },

  onUnload: function () {
    this.unSubscribe()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
