// 分为数据描述符和存取描述符
var obj = {}
let value = 123
obj.sex = 1 //直接添加的属性是可枚举的，可以被打印出来的 ，默认情况下，使用Object.defineProperty添加的属性是不可枚举的，
// 这样直接写，等同于
Object.defineProperty(obj, 'sex', {
    value: 1,
    enumerable: true,
    configurable: true,
    writable: true
})
// 而这样等同于直接把其他配置项都使用默认值，false
Object.defineProperty(obj, "b", {
    value: 1
});


Object.defineProperty(obj, 'a', {
    value: 123,
    enumerable: true, // 默认为false 决定了是否可以在for in和Object.keys里被遍历出来
    configurable: true, //默认为false  是否可以被删除
    writable: true, //默认为false  是否可以被修改
})
Object.defineProperty(obj, 'age', {
    value: 18, // 数据描述符和存取描述符不能混用
    // get: () => {
    //     return value
    // }
})
Object.defineProperty(obj, 'name', {
    // value: 123,
    get: () => {
        return value
    },
    set: (newValue) => {
        value = newValue
    },
    // 存取描述符可以跟 数据描述符的configurable和enumerable搭配 
    // 不能跟value和writable搭配
    enumerable: true,
    configurable: true
})
console.log(obj.name);
obj.name = 456
console.log(obj.name);
console.log(obj);

//Object.prototype.propertyIsEnumerable  返回一个布尔值，表示一个属性值是否可以被遍历
let arr = [1, 2, 3]
console.log(arr.propertyIsEnumerable(1));

// 继承属性
function Foo() {

}
// 这样写demo不对
// Object.defineProperty(Foo.prototype, 'age', {
//     value: 1
// })

Object.defineProperty(Foo.defineProperty, '')