var words = ['language', 'number', 'developers', 'feature', 'browsers', 'climbing', 'communicate']

let a = words.sort((a, b) => {
  // return a[1].charCodeAt() - b[1].charCodeAt()
  return a.charCodeAt(1) - b.charCodeAt(1)
  // 目前还有缺陷，没有第三个字母的顺序跟题目要求的顺序不对
})
console.log(a);