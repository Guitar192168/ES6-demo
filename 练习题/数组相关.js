// push

var a = [1, 2, 3, 4]

//push 返回数组长度，原数组改变
let b = a.push(5)
console.log(a)
console.log(b)

//shift用于删除并返回首个元素，返回被删元素， 改变原数组
let c = a.shift(-1)
console.log(c,'c')
console.log(a,'ca')

// unshift
//首部添加一个或者多个元素，返回数组的长度，改变原数组
let d = a.unshift(0,'123')
console.log(d)
console.log(a)

//pop 返回数组长度 改变原数组
let e = a.pop()
console.log(e,'e')
console.log(a,'ea')

//splice 改变原数组，返回 被删除的数组。没有删除元素则返回空数组
let f = a.splice(1,2,4,5,6,7,8,9)
console.log(f,'f')
console.log(a,'a')

// reverse()
// sort()

