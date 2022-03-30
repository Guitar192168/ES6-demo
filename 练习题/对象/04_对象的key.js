// 对象的key属性只能是字符串或者是Symbol类型的
var a = {},
    b = '123',
    c = 123
a[b] = 'b';
a[c] = 'c'
// 这里是同名了，所以还是'c'
console.log(a[b]);

var a = {},
    b = Symbol('123'),
    c = Symbol('123')
a[b] = 'b'
a[c] = 'c'
console.log(a[b]);

// 这里的就成了'[object Object]' 被覆盖了
var a = {},
    b = {
        key: '123'
    },
    c = {
        key: '456'
    }
a[b] = 'b'
a[c] = 'c'
console.log(a[b]);