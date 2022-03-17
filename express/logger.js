const express = require("express");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port"); // port 세팅 후 호출해야하기 때문에 app.set 아래에 위치..

// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(__dirname + "/public"));

// 테스트용 로거.. 보통 get위에 많이 사용함
const myLogger = function (req, res, next) {
  console.log("Test Middleware");
  next();
};
app.use(myLogger);

app.get("/", (req, res, next) => {
  res.send("hello NODE!");
  // next();
});

app.listen(PORT, function () {
  "포트에서 서버 실행중";
});
