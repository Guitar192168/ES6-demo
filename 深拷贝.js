// let obj = {
//     name: '澳龙',
//     age: 18,
//     data: {
//         sex: '男',
//         birthDay: [1, 2, 3],
//         value: {
//             a: 1,
//             b: 2
//         }
//     },
//     demo: ['a', 'b', 'c']
// }

let obj = [{a: 1, b: 2}, 3, 4, {a: [122, 333], b: {c: 5, d: 6}}, [1, 2, 3]]

function deepClone(target, origin) {

    target = target || {}

    let isArray = Object.prototype.toString;

    for (var item in origin) {
        if (origin.hasOwnProperty(item)) {
            // if (typeof item === 'object') {
            if (origin[item] !== 'null' && typeof origin[item] === 'object') {
                // (isArray(origin[item]) === '[Object Object]') ? target[item] = {} : target[item] = []
                target[item] = (isArray.call(origin[item]) === '[object Object]') ? {} : []
                deepClone(target[item], origin[item])
            } else {
                target[item] = origin[item]
            }
        }
    }

    return target
}

let obj2 = {}
deepClone(obj2, obj)
console.log(obj2)

