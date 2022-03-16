// promise 를 보완해서 async / await

function workPromise(sec) {
  return new Promise(function (resolve, reject) {
    // db에서 데이터받기 가상으로 하기위한 timeout
    setTimeout(function () {
      resolve("working...");
    }, sec);
  });
}

async function asyncFunction() {
  const result = await workPromise(1000);
  console.log(result);
}
asyncFunction().then(function (result) {
  console.log(result + "두번째");
});
