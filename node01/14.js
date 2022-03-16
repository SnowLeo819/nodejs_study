function workPromise(param) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (param) {
        resolve("해결");
      } else {
        reject("실패");
      }
    }, 1000);
  });
}

// pending   fullfield  / rejected
// 기본형
// workPromise(false).then(
//   function (msg) {
//     console.log(msg);
//   },
//   function (err) {
//     console.log(err);
//   }
// );
workPromise(true)
  .then(function (msg) {
    console.log(msg);
  })
  .catch(function (err) {
    console.log(err);
  });

// promise 를 보완해서 async / await
