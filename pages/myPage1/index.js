// pages/myPage1.js
import wamy from '../../core/index'
import { connect, wrapper } from '../../wamy-redux/index'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../reduxRelated/actions/index'

const mapStateToData = state => {
  return {
    switchValue1: !!state.reducer1.switchValue,
    switchValue2: !!state.reducer2.switchValue
  }
}

const mapDispatchToMethods = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
    dispatchSwitch1: (...args) => dispatch(actionCreators.reducer1Action(args))
  }
}

// 碰到问题： 加上connect以后，MyPage1的方法都不见了。 原因：
@connect(mapStateToData, mapDispatchToMethods)
export default class MyPage1 extends wamy.page {
  data = {
    name: 1234,
    myName: 'page1'
  }

  log1() {
    console.log('===== log1:')
  }

  async log2() {
    console.log('===== log2:')
  }

  switch2(){
    this.actions.reducer2Action()
  }

  switch12_thunk(){
    this.actions.thunkAction()
  }

  switch12_saga(){
    this.actions.sagaAction()
  }
}
