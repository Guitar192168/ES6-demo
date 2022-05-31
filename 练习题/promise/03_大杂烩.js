//  async function async1() {
//    console.log('async1 start');
//    await async2()
//    console.log('async1 end');
//  }

//  async function async2() {
//    console.log('async2');
//  }

//  setTimeout(function () {
//    console.log('setTimeout0');
//  }, 0);

//  setTimeout(function () {
//    console.log('setTimeout2');
//  }, 300);

//  setImmediate(() => console.log('setImmediate'))
//  process.nextTick(() => console.log('nextTick1'))
//  async1()
//  process.nextTick(() => console.log('nextTick2'))

//  new Promise(function (resolve) {
//    console.log('promise1');
//    resolve();
//    console.log('promise2');
//  }).then(function () {
//    console.log('promise3');
//  })
//  console.log('script end');



// new Promise((resolve, reject) => {
//   resolve(1)
// }).then(res => {
//   console.log(res);
// })
// process.nextTick(() => console.log('nextTick1'))


// setImmediate(function () {
//   console.log(1);
// }, 1000)

// setTimeout(() => {
//   console.log(2);
// }, 1000);

// new Promise(resolve => {
//   console.log(3);
//   resolve()
//   console.log(4);
// }).then(function () {
//   console.log(5);
// })
// console.log(6);
// process.nextTick(function () {
//   console.log(7);
// })
// console.log(8);

setImmediate(function () {
  console.log(1);
}, 0);
setTimeout(function () {
  console.log(2);
}, 0);
new Promise(function (resolve) {
  console.log(3);
  resolve();
  console.log(4);
}).then(function () {
  console.log(5);
});
console.log(6);
process.nextTick(function () {
  console.log(7);
});
console.log(8);