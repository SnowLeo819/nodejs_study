const express = require("express");
const app = express();

app.set("port", process.env.port || 3000);

app.use(express.static(__dirname + "/public")); // 정적 파일 관리

app.get("/", (req, res) => {
  // // res.send("Hello Express");
  // res.send(__dirname + "/index.html");
  res.sendFile(__dirname + "/index.html");
});

app.get("/board", (req, res) => {
  // res.send("Hello Express");
  res.sendFile(__dirname + "/board.html");
});

app.get("/user/:id", (req, res) => {
  // res.send("Hello Express");
  // res.sendFile(__dirname + "/user.html");
  console.log(req.params.id);
  console.log(req.url);
  res.send(req.params.id + " 님 안녕하세요");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), " 포트에서 서버 실행중");
});
