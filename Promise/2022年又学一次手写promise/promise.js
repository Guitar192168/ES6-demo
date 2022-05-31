//声明构造函数  promise实例化的时候也接收一个参数
function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending'
    this.PromiseResult = undefined

    // 指定回调，就算promise内部是异步任务，等到状态改变了再来执行.then里面的回调方法
    // this.callBack = {}
    this.callBacks = []

    // this指向有问题
    // let self = this
    // function resolve(value) {
    //     self.PromiseState = 'fulFilled'
    //     self.PromiseResult =  value
    // }

    // function reject(reason) {
    //     self.PromiseState = 'rejected'
    //     self.PromiseResult = reason
    // }

    const resolve = (value) => {
        // 保证状态只能修改一次
        if (this.PromiseState !== 'pending') return
        this.PromiseState = 'fulfilled'
        this.PromiseResult = value
        // if (this.callBack.onResolved) {
        //     this.callBack.onResolved(value)
        // }
        setTimeout(() => {
            this.callBacks.forEach(item => {
                item.onResolved(value)
            })
        })
    }
    const reject = (reason) => {
        if (this.PromiseState !== 'pending') return
        this.PromiseState = 'rejected'
        this.PromiseResult = reason
        // if (this.callBack.onRejected) {
        //     this.callBack.onRejected(reason)
        // }
        setTimeout(() => {
            this.callBacks.forEach(item => {
                item.onRejected(reason)
            })
        })
    }

    // try加在执行   执行器函数前面即可
    try {
        // 同步调用执行器函数
        executor(resolve, reject)
    } catch (e) {
        // this.PromiseState = 'rejected'
        // this.PromiseResult = e
        reject(e)
    }
}


Promise.prototype.then = function (onResolved, onRejected) {
    const that = this;
    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }

    if (typeof onResolved !== 'function') {
        // onResolved = value => {
        //     return new Promise((r, j) => {
        //         r(value)
        //     })
        // }
        onResolved = value => value
    }
    // 一开始给callBack定义在这里，闹笑话
    return new Promise((resolve, reject) => {
        function callBack(type) {
            try {
                // console.log(this 这里this指向window);
                const res = type(that.PromiseResult)
                if (res instanceof Promise) {
                    res.then(r => {
                        resolve(r)
                    }, j => {
                        reject(j)
                    })
                } else {
                    // tips: 注意，这里不是reject(res)
                    resolve(res)
                }
            } catch (e) {
                reject(e)
            }
        }

        // try { 不用再try catch了  执行器函数那里的try catch已经拦截到了
        if (this.PromiseState === 'fulfilled') {
            setTimeout(() => {
                // 调用回调函数
                const res = onResolved(this.PromiseResult)
                if (res instanceof Promise) {
                    // return res   错误写法 ，直接返回这个promise对象

                    res.then(r => {
                        resolve(r)
                    }, j => {
                        reject(j)
                    })

                } else {
                    // 如果返回的结构不是Promise的实例，
                    // 则结果的对象状态为成功  成功的结果为return的结果
                    // tips: 这里不需要手动再返回一个Promise了，外部已经返回了一个Promise对象
                    // 这里多此一举  但是为什么又不影响返回值呢？  猜测是同步执行 + 调用的外层的resolve
                    // return new Promise((r, j) => {
                    // r(res) ?为啥不用的这里的 r(res)
                    resolve(res)
                    // })
                }
            })
        }

        // } catch (e) {
        //     reject(e)
        // }
        // console.log(e);
        if (this.PromiseState === 'rejected') {
            //调用回调函数
            // const res = onRejected(this.PromiseResult)
            // if (res instanceof Promise) {
            //     res.then(r => {
            //         resolve(r)
            //     }, j => {
            //         reject(j)
            //     })
            // } else {
            //     // tips: 注意，这里不是reject(res)
            //     resolve(res)
            // }
            setTimeout(() => {
                callBack(onRejected)
            })
        }


        if (this.PromiseState === 'pending') {
            this.callBacks.push({
                // 这里没替换成callBack是这里用了形参，实参，算是提醒一下还有这种写法也可以拿到PromiseResult
                onResolved: function (value) {
                    // const res = onResolved(that.PromiseResult)
                    const res = onResolved(value)
                    if (res instanceof Promise) {
                        res.then(r => {
                            resolve(r)
                        }, j => {
                            reject(j)
                        })
                    } else {
                        resolve(res)
                    }
                },
                onRejected: function (value) {
                    callBack(onRejected)
                }
            })
        }
    })
}


Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}


// 函数对象的方式

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(r => {
                resolve(r)
            }, j => {
                reject(j)
            })
        } else {
            resolve(value)
        }
    })
}


Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        // if (reason instanceof Promise) {
        //     reason.then(r => {
        //         resolve(r)
        //     }, j => {
        //         reject(j)
        //     })
        // } else {
        //     reject(reason)
        // }
        reject(reason)
    })
}


Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        let arr = []
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(value => {
                arr[i] = value
                count++
                if (count === promises.length) {
                    resolve(arr)
                }
            }, reason => {
                reject(reason)
            })
        }
    })
}


Promise.race = function (promises) {
    return new Promise((resolve, rejected) => {
        for (let item of promises) {
            item.then(value => {
                resolve(value)
            }, reason => {
                rejected(reason)
            })
        }
    })
}