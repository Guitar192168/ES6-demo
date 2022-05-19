let  a = [{id:1},{id:3},{id:5},{id:7}]
let  b= [{id:1},{id:5,name:'mingzi'},{id:4}]

let temp = b.filter(item => a.some(v => v.id === item.id))
let res = []
a.forEach(item => {
    let bItem = temp.find(v => item.id === v.id)
    res.push(bItem || item)
})
console.log(res);