// pages/tab1/index.js

const app = getApp()
const store = app.store
Page({

  /**
   * 页面的初始数据
   */
  data: {
    valueOfReducer1: !!store.getState().reducer1.switchValue,
    valueOfReducer2: !!store.getState().reducer2.switchValue
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    console.log('========tab1 page onLoad')
    this.unSubscribe = store.subscribe(()=>{
      this.setData({
        valueOfReducer1: store.getState().reducer1.switchValue,
        valueOfReducer2: store.getState().reducer2.switchValue
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('========tab1 page onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('========tab1 page onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('========tab1 page onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('========tab1 page onUnload')
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
