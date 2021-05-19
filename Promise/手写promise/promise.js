function Promise(executor) {
    //添加属性
    this.promiseState = 'pending';
    this.promiseResult = null;

    //声明属性
    //不能在原型中声明，因为如果有多个promise，则修改的是同一个callback了
    this.callback = {};

    let self = this;

    function resolve(data) {
        //状态改变一次后就不再发生改变
        if (self.promiseState !== "pending") return
        //    1.修改对象的状态 promiseState    实例对象 案例里是p实例对象
        //    2.修改对象的结果值 promiseResult
        self.promiseResult = data;
        self.promiseState = 'fulfilled';
        //调用成功的回调函数
        if (self.callback.onResolved) {
            self.callback.onResolved(data)
        }
    }


    function reject(data) {
        if (self.promiseState !== "pending") return
        self.promiseResult = data;
        self.promiseState = 'rejected';
        if (self.callback.onRejected) {
            self.callback.onRejected(data)
        }
    }

    try {
        //执行器函数立即执行
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }


}


Promise.prototype.then = function (onResolved, onRejected) {
    //调用回调函数
    if (this.promiseState === 'fulfilled') {
        resolved(this.promiseResult);
    }

    if (this.promiseState === 'rejected') {
        rejected(this.promiseResult);
    }

    //判断pending状态
    if (this.promiseState === 'pending') {
        // 改变状态的时候才去执行回调    成功的回调，失败的回调

        //保存 then里面的 回调函数!!!
        this.callback = {
            onResolved,
            onRejected
        }
    }
}