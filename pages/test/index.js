// pages/test/index.js
// require("../../lib/babel-polyfill")
// require('lodash')
// require("regenerator-runtime")
// require('babel-polyfill')



// var abc = require('react')
// console.log('=== abc:',abc)
//  123
require('redux')

require('react-redux')
Page({

  data: {
    name: getApp().globalData.name,
    pageName: 'page test'
  },

})

async function abc(){
  console.log('123123123')
}

class A {
  myName(){}
  data=123
}

class B extends A {
  // static data={myName:'abc'}

  async customLoad(){
    console.log('=== customLoad:',)
  }
}
