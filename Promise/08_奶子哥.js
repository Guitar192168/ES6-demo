console.log(1);
setTimeout(() => {
    console.log(2);
})

Promise.resolve().then(() => {
    console.log(3);
}).then(() => {
    console.log(4);
})

function promise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(5);
            resolve(true)
        }, 1000)
    })
}

async function a() {
    console.log(6);
    await promise()
    console.log(7);
}
a()
1 6 5
宏任务 微任务
2 3 4 7