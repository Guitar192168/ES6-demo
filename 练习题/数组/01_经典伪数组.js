let obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
}

obj.push(1)
obj.push(2)
console.log(obj);
// Object(4) [empty × 2, 1, 2, push: ƒ, splice: ƒ] 类似数组这样

// push方法默认为下面的
// 假设就push一个数据
Array.prototype.push = function (target) {
    this[this.length] = target
    this.length++
}