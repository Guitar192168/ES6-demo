function Promise(executor) {
    this.PromiseState = 'pending'
    this.PromiseResult = undefined
    this.callbacks = []

    const that = this

    function resolve(value) {
        // console.log(this)  //this指向window
        if (that.PromiseState !== 'pending') return
        that.PromiseState = 'fulfilled'
        that.PromiseResult = value
        // if (that.callback.onResolved) {
        that.callbacks.forEach(item => {
            setTimeout(() => {
                item.onResolved(value)
            })
        })
    }

    function reject(reason) {
        if (that.PromiseState !== 'pending') return
        that.PromiseState = 'rejected'
        that.PromiseResult = reason
        that.callbacks.forEach(item => {
            setTimeout(() => {
                item.onRejected(reason)
            })
        })
    }

    try {
        executor(resolve, reject)
    } catch (e) {
        reject(e)
    }
}


Promise.prototype.then = function (onResolved, onRejected) {
    const that = this;
    if (typeof onResolved !== 'function') {
        onResolved = value => value
    }

    if (typeof onRejected !== 'function') {
        onRejected = reason => {
            throw reason
        }
    }


    return new Promise((resolve, reject) => {
        function callBack(type) {
            try {
                const res = type(that.PromiseResult)
                if (res instanceof Promise) {
                    res.then(r => {
                        resolve(r)
                    }, j => {
                        reject(j)
                    })
                } else {
                    resolve(res)
                }
            } catch (e) {
                reject(e)
            }
        }

        if (this.PromiseState === 'fulfilled') {
            setTimeout(() => {
                const res = onResolved(this.PromiseResult)
                if (res instanceof Promise) {
                    res.then(r => {
                        resolve(r)
                    }, j => {
                        reject(j)
                    })
                } else {
                    resolve(res)
                }
                // console.log(res, '121')
            })
        }

        if (this.PromiseState === 'rejected') {
            setTimeout(() => {
                // onRejected(this.PromiseResult)
                callBack(onRejected)
            })
        }


        if (this.PromiseState === 'pending') {
            this.callbacks.push({
                onResolved: function () {
                    try {
                        const res = onResolved(that.PromiseResult)
                        if (res instanceof Promise) {
                            res.then(r => {
                                resolve(r)
                            }, j => {
                                reject(j)
                            })
                        } else {
                            resolve(res)
                        }
                    } catch (e) {
                        reject(e)
                    }
                },
                // onResolved,
                onRejected: function () {
                    callBack(onRejected)
                }
            })
        }
    })
}


// Promise.prototype.catch = function (onResolved, onRejected) {
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}


Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        // resolve(value)
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
        reject(reason)
    })
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let count = 0
        let arr = []
        // try {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(value => {
                count++
                arr[i] = value
                if (count === promises.length) {
                    //这里等三个都正确才修改
                    resolve(arr)
                }
            }, reason => {
                //Promise状态修改过一次就不可以修改了
                reject(reason)
            })
        }
        // } catch (e) {
        //     reject(e)
        // }
    })
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        // let count = 0
        // let arr = [] //这俩就不需要了
        for (let i = 0; i < promises.length; i++) {
                promises[i].then(value => {
                    resolve(value)
                }, reason => {
                    reject(reason)
                })
        }
    })
}