
import wamy from '../../core/index'

export default class MyPage extends wamy.page{
  data= {
    name: 123,
    myName: 'abc'
  }

  logFunction(){
    console.log('===== logFunction:')
  }

  onLoad(){
    console.log('======== MyPage onLoad 事件',)
  }
}
