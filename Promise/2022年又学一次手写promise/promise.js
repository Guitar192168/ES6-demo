//声明构造函数  promise实例化的时候也接收一个参数
function Promise(executor) {
    // 添加属性
    this.PromiseStatus = 'pending'
    this.PromiseResult = undefined

    // 指定回调，就算promise内部是异步任务，等到状态改变了再来执行.then里面的回调方法
    this.callBack = {}

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
        this.callBack.onResolved(value)
    }
    const reject = (reason) => {
        if (this.PromiseStatus !== 'pending') return
        this.PromiseStatus = 'rejected'
        this.PromiseResult = reason
        this.callBack.onRejected(reason)
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
            // 调用回调函数
            onResolved(this.PromiseResult)
        }

        if (this.PromiseStatus === 'rejected') {
            //调用回调函数
            onRejected(this.PromiseResult)
        }

        if (this.PromiseStatus === 'pending') {
            this.callBack = {
                onResolved: onResolved,
                onRejected: onRejected
            }
        }
    })
}