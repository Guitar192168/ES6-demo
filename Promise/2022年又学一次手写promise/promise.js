//声明构造函数  promise实例化的时候也接收一个参数
function Promise(executor) {
    // 添加属性
    this.PromiseStatus = 'pending'
    this.PromiseResult = undefined

    // this指向有问题
    // let self = this
    // function resolve(value) {
    //     self.PromiseStatus = 'fulFilled'
    //     self.PromiseResult =  value
    // }

    // function reject(reason) {
    //     self.PromiseStatus = 'rejected'
    //     self.PromiseResult = reason
    // }

    const resolve = (value) => {
        // 保证状态只能修改一次
        if (this.PromiseStatus !== 'pending') return
        this.PromiseStatus = 'fulfilled'
        this.PromiseResult = value
    }
    const reject = (reason) => {
        if (this.PromiseStatus !== 'pending') return
        this.PromiseStatus = 'rejected'
        this.PromiseResult = reason
    }

    // try加在执行   执行器函数前面即可
    try {
        // 同步调用执行器函数
        executor(resolve, reject)
    } catch (e) {
        // this.PromiseStatus = 'rejected'
        // this.PromiseResult = e
        reject(e)
    }
}


Promise.prototype.then = function (onResolved, onRejected) {


    return new Promise((resolve, reject) => {
        if (this.PromiseStatus === 'fulfilled') {
            onResolved()
        }

        if (this.PromiseStatus === 'rejected') {
            onRejected()
        }
    })
}