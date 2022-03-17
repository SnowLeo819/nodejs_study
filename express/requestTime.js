const express = require("express");
const app = express();
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

//middleWare..  next 명령어가 필요함...
const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);
app.get("/", (req, res) => {
  const output = `
  나는 문자로 클라이언트에 응답하는 send() 메서드 입니다.
  ${req.requestTime}
  `;
  res.send(output);
});

app.listen(PORT, () => {
  console.log(PORT, "포트에서 작업중");
});
