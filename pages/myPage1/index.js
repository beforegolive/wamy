// pages/myPage1.js
import wamy from '../../core/index'

export default class MyPage1 extends wamy.page {
  data = {
    name: 123,
    myName: 'abc'
  }

  log1() {
    console.log('===== log1:')
  }

  async log2() {
    console.log('===== log2:')
  }
}
