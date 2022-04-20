const obj = {}
const symbol1 = Symbol(1)
Object.defineProperty(obj, 'name', {
    value: "yjq",
    enumerable: true, // 默认为false，为true时可以被遍历。
    configurable: false, // 配置是否可以被删除, 为true可以被删除，属性描述符也可以被改变
    writable: true, // 配置是否可以被修改
})
Object.defineProperty(obj, symbol1, { // 定义一个symbol属性
    value: '123'
})
const obj2 = {
    [symbol1]: 456
}
console.log(obj);
console.log(Object.keys([obj]).length, 'Object.keys'); // 弊端：无法查询 描述符属性enumerable为false的属性
console.log(Object.values([obj]).length, 'Object.values');
console.log(Object.getOwnPropertyNames([obj]).length, 'Object.getOwnPropertyNames'); // 弊端： 无法查询属性为symbol的
console.log(Object.entries(obj), 'Object.entries'); // 返回对象的可枚举属性的键值对的数组

let arrLength = 0
for (let item in obj) { // 最优解
    if (obj.hasOwnProperty(item)) {
        arrLength++
    }
}
console.log(arrLength, 'arrLength');
obj.name = '789'
delete obj.name
console.log(obj);