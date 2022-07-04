var words = ['language', 'number', 'developers', 'feature', 'browsers', 'climbing', 'communicate']

let a = words.sort((a, b) => {
  // return a[1].charCodeAt() - b[1].charCodeAt()
  return a.charCodeAt(1) - b.charCodeAt(1)
  // 目前还有缺陷，没有第三个字母的顺序跟题目要求的顺序不对
})
console.log(a);

// 同时还了解了 字符串的charAt()和charCodeAt()
let b = 'abc'
// charAt 返回指定位置的字符
console.log(b.charAt(0));
console.log(b.charAt());
// 超出的返回一个空字符串
console.log(b.charAt(4));

// 返回指定位置的编码  
console.log(b.charCodeAt(0))
console.log(b.charCodeAt())
// 如果传入的不是一个数值，则默认传入的是0
console.log(b.charCodeAt('adasdasdasds'))
// 超出部分返回NaN
console.log(b.charCodeAt(4))