// pages/test/index.js
// require("../../lib/babel-polyfill")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: getApp().globalData.name,
    pageName: 'page test'
  },

})

class A {
  myName(){}
  data=123
}

class B extends A {
  static data={myName:'abc'}

  // async customLoad(){
  //   console.log('=== customLoad:',)
  // }
}
