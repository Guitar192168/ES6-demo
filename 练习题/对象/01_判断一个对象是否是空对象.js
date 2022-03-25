const obj = {}
const symbol1 = Symbol(1)
Object.defineProperty(obj, 'name', {
    value: "yjq",
    enumerable: false
})
Object.defineProperty(obj, symbol1, { // 定义一个symbol属性
    value: '123'
})
const obj2 = {
    [symbol1]: 456
}
console.log(obj);
console.log(Object.keys([obj]).length);
console.log(Object.getOwnPropertyNames([obj]).length);