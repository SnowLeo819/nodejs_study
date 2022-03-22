const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const moment = require("moment");

// 서버용 라이브러리
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

// 미들웨어
dotenv.config();
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/public")));

// 포트 설정..
app.set("port", process.env.PORT || 3001);
const PORT = app.get("port");

// 서버 설정
io.on("connection", (socket) => {
  console.log("working...");
  socket.on("chatting", (data) => {
    console.log(data);
    // io.emit("chatting", { name: "서버!", msg: "서버의 메세지!" });
    io.emit("chatting", {
      name: data.name,
      msg: data.msg,
      time: moment(new Date()).format("A hh:mm"),
    });
  });
});

// 메인페이지
app.get("/", (req, res) => {
  res.send("<h1>Hello Node</h1>");
});

// 채팅 페이지
app.get("/chatting/chatting", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});

// 작업 로그
server.listen(PORT, () => {
  console.log(PORT, " 에서 작업중");
});
