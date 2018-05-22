
import wamy from '../../core/index'

function getPromise(){
  let seconds = 3
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve(`wait for ${seconds}, and promise ends`)
    }, seconds * 1000)
  })
}

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

  async asyncLog(){
    console.log('===== asyncLog start',)
    const promiseValue = await getPromise()
    console.log('===', promiseValue)
  }
}
