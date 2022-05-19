 let a = [{id: 1,name: 123}, {id: 2,name: 456},{id:4,name:9999}]
 let b = [{id: 1,name: 789}, {id: 3,name: 888},{id:2,name:11}]

let x = a.filter(item => (b.every(m => m.id != item.id))).map(item => item.id)
console.log(x);
b.forEach((item, index) => {
    if (x.includes(item.id))b.splice(index,1)
})

console.log(b);