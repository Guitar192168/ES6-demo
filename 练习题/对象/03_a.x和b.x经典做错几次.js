var a = {
    n: 1
}
var b = a
a.x = a = {
    n: 2
}
// . 的优先级比=赋值的优先级要高。所以先查询a.x 此时a和b还指向的同一个地址。然后从右往左开始赋值的。
console.log(a);
console.log(b);
console.log(a.x);
console.log(b.x);