// node js module() 가져와서 쓴다.
// node js는 서버프로그래밍 언어는 아니다. 브라우져에서 떼어낸 해석기
// express 모듈
const http = require("http");
http
  .createServer(function (req, res) {
    // 결과를 보res여주기
    //console.log(req);
    //3개 만들기.. /, /user , /board
    console.log(req.url); //사용자가 요청하는 보고 싶은 주소
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.write("<h1>Main</h1>");
      res.write(
        `<ul>
          <li><a href="/">main</a></li>
          <li><a href="/board">board</a></li>
          <li><a href="/user">user</a></li>
        </ul>`
      );
      res.end();
    } else if (req.url === "/user") {
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.write("<h1>User</h1>");
      res.write(
        `<ul>
          <li><a href="/">main</a></li>
          <li><a href="/board">board</a></li>
          <li><a href="/user">user</a></li>
        </ul>`
      );
      res.end();
    } else if (req.url === "/board") {
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.write("<h1>Board</h1>");
      res.write(
        `<ul>
          <li><a href="/">main</a></li>
          <li><a href="/board">board</a></li>
          <li><a href="/user">user</a></li>
        </ul>`
      );
      res.end();
    }
  })
  .listen(3001, function () {
    console.log("3001번 포트에서 서버 연결중");
  });
