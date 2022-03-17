const express = require("express"); // 서버 열기
const morgan = require("morgan"); // 서버 콘솔에 로그 찍기..
const path = require("path");
const cors = require("cors"); // (기본 : 같은 서버 내에서만 리소스 허용,, 을 풀어주는 프로그램)
const app = express();

// 포트설정
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

// 미들웨어
app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("dev")); // 서버 콘솔에 로그 찍기..
app.use(express.json());
app.use(cors()); // 모든 도메인에 허용 ( 다른사람이 내 서버로 접근 )

app.get("/", (req, res) => {
  res.send("Hello Node");
});

app.get("/parsing", (req, res) => {
  res.sendFile(__dirname + "/parsing.html");
});

app.get("/json", (req, res) => {
  res.json([
    { id: "pjh", age: 30 },
    { id: "phk", age: 30 },
    { id: "cjy", age: 30 },
    { id: "kjh", age: 30 },
    { id: "yjs", age: 30 },
  ]);
});

app.get("/parsing", (req, res) => {
  res.sendFile(path.join(__dirname, "/parsing.html"));
});

// 작업위치 확인..
app.listen(PORT, () => {
  console.log(PORT + "에서 작업중");
});
