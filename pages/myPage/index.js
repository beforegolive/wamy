import wamy from '../../core/index'

function getPromise() {
  let seconds = 3
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`wait for ${seconds}, and promise ends`)
    }, seconds * 1000)
  })
}

// const mapStateToProps = state => {
//   return {
//     name: state.reducer1.name,
//     mySelf: state.reducer2.my
//   }
// }
//
// const mapDispatchToProps = state

// 这种方式的wrapper操作的结果是：给target类创造了一个继承它的子类，并返回对应的实例
// subType ---> target ---> super_target
//
// 注意事项：
// 1. subType实例的构造函数访问到的是subType函数的prototype, 之前target变成了prototype第二层。
// 2. subType的实例包含MyPage中定义的属性。
function wrapper() {
  return function(target) {
    target.prototype.wrapperName = 'wrapper'
    target.prototype.getWrapperName = function() {
      return 'wrapper'
    }

    const onLoad = target.prototype.onLoad

    class Connector extends target {
      myName = '123456'

      onLoad() {
        console.log('==== subType onLoad')
        onLoad && onLoad()
      }

      method_in_subType() {}
    }

    //
    Object.getOwnPropertyNames(target.prototype).forEach(key => {
      if (Connector.prototype[key] === undefined)
        Connector.prototype[key] = target.prototype[key]
    })
    return Connector
  }
}

@wrapper()
export default class MyPage extends wamy.page {
  data = {
    name: 123,
    myName: 'abc'
  }

  logFunction() {
    console.log('===== logFunction:')
  }

  onLoad() {
    console.log('======== MyPage onLoad 事件')
  }

  async asyncLog() {
    console.log('===== asyncLog start')
    const promiseValue = await getPromise()
    console.log('===', promiseValue)
  }

  invokeWrapperMethod() {
    var name = this.getWrapperName()
    console.log('=== invokeWrapperMethod value:', name)
  }
}
