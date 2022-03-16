function workPromise(sec) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(new Date().toISOString());
    }, sec);
  });
}
workPromise(1000)
  .then(function (result) {
    console.log("작업1", result);
    return workPromise(1000);
  })
  .then(function (result) {
    console.log("작업2", result);
    return workPromise(1000);
  })
  .then(function (result) {
    console.log("작업3", result);
    return workPromise(1000);
  });
