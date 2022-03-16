// node.js 비동기 처리...
// call back함수.. 나중에 처리됨..

// setTimeout(() => {
//   console.log("todo : first working");
// }, 0);
// setTimeout(() => {
//   console.log("todo : second working");
// }, 3000);
// setTimeout(() => {
//   console.log("todo : third working");
// }, 2000);

setTimeout(() => {
  setTimeout(() => {
    console.log("todo : third working");
  }, 1000);
  console.log("todo : second working");
}, 1500);

// for (let i = 0; i < 100; i++) {
//   console.log("todo : " + i + " working");
// }
// console.log("todo : second working");
