function fakeTimeout(callback) {
  callback();
}
console.log("0");

fakeTimeout(function () {
  console.log("1");
});

console.log("2");

function aa() {
  console.log("aa");
}
aa();
