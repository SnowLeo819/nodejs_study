// Node.js => modul().. 필요한거만 가져와서 쓴다

const http = require("http");
http
  .createServer(function (req, res) {
    // res.. 결과 보여주기
    // console.log(req);
    // 3종류 만들기.. /, user, board
    console.log(req.url); // 사용자 요청 주소
    if (req.url === "/") {
      res.writeHead(200, { "Content-type": "text/html; charset=UTF8" });
      res.write("<h1> Node.js 로 서버만들기 01 </h1>");
      res.end("<p> index 페이지 입니다. http 모듈 사용중  </p>");
    } else if (req.url === "/user") {
      res.writeHead(200, { "Content-type": "text/html; charset=UTF8" });
      res.write("<h1> Node.js 로 서버만들기 01 </h1>");
      res.end("<p> USER 페이지 입니다 </p>");
    } else if (req.url === "/board") {
      res.writeHead(200, { "Content-type": "text/html; charset=UTF8" });
      res.write("<h1> Node.js 로 서버만들기 01 </h1>");
      res.end("<p> BOARD 페이지 입니다 </p>");
    }
  })

  .listen(3000, function () {
    console.log("3000 포트에서 서버 연결중");
  });
