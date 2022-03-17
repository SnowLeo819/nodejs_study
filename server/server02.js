const http = require("http");
const fs = require("fs").promises;
http
  .createServer(async (req, res) => {
    //요청 받아서 page 만들어 보기...
    if (req.url === "/") {
      try {
        const file = await fs.readFile("./server/main.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(file);
      } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(e.message);
      }
    } else if (req.url === "/board") {
      try {
        const file = await fs.readFile("./server/board.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(file);
      } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(e.message);
      }
    } else if (req.url === "/user") {
      try {
        const file = await fs.readFile("./server/user.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(file);
      } catch (e) {
        console.log(e);
        res.writeHead(500, { "Content-Type": "text/html; charset=UTF-8" });
        res.end(e.message);
      }
    }
  })
  .listen(3001, () => {
    console.log("3001포트에서 서버 연결중");
  });
