var a = {},
    b = '123',
    c = 123
a[b] = 'b';
a[c] = 'c'

console.log(a[b]);

// var d = {},
//     e = Symbol('123'),
//     f = Symbol('123')
// d[e] = 'b'
// d[f] = 'c'
// console.log(d[e]);

// var a = {},
//     b = {
//         key: '123'
//     },
//     c = {
//         key: '456'
//     }
// a[b] = 'b'
// a[c] = 'c'
// console.log(a[b]);