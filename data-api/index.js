// 라이브러리
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const app = express();
const cors = require("cors");

// 포트 설정
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

// 미들웨어
app.use(morgan("dev")); // common, combined 등이 있음.
app.use(express.json()); // json 리턴하기 위해 적용
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public"))); // 정적 폴더 설정
app.use(cors());

// index 페이지
app.get("/", (req, res) => {
  // console.log(res);
  res.send("Hello World!");
});

app.get("/airSelf", (req, res) => {
  res.sendFile(path.join(__dirname, "/air.html"));
});

app.get("/result", (req, res) => {
  //res.sendFile(__dirname + "/public/html/result.html");
  res.sendFile(path.join(__dirname, "/public/html/result.html"));
});

// 미세먼지 부분
app.get("/air", async (req, res) => {
  const city = req.query.city;
  console.log(city);
  const serviceKey =
    "CZ0nZUHrTXCOY589SrfcnsGNia98r3AjjGCvrWElufJznTvGZN95SQ%2F6hVbbfA0Jbp9M0P6tcAp3o2J%2BHah%2BJg%3D%3D";
  const airUrl =
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

  let queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + serviceKey; /* Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("returnType") +
    "=" +
    encodeURIComponent("json"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("40"); /* */
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" + encodeURIComponent("sidoName") + "=" + encodeURIComponent(city); /* */
  queryParams +=
    "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.0"); /* */
  const url = airUrl + queryParams;
  const result = await axios.get(url);
  // console.log(url);
  // console.log(result.data.response.body.items);
  res.json(result.data.response.body.items);
});

// post로 받을 때
app.post("/air", async (req, res) => {
  const city = req.body.city;
  console.log(city);
  const serviceKey =
    "CZ0nZUHrTXCOY589SrfcnsGNia98r3AjjGCvrWElufJznTvGZN95SQ%2F6hVbbfA0Jbp9M0P6tcAp3o2J%2BHah%2BJg%3D%3D";
  const airUrl =
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

  let queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + serviceKey; /* Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("returnType") +
    "=" +
    encodeURIComponent("json"); /* */
  queryParams +=
    "&" +
    encodeURIComponent("numOfRows") +
    "=" +
    encodeURIComponent("40"); /* */
  queryParams +=
    "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
  queryParams +=
    "&" + encodeURIComponent("sidoName") + "=" + encodeURIComponent(city); /* */
  queryParams +=
    "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.0"); /* */
  const url = airUrl + queryParams;
  const result = await axios.get(url);
  // console.log(url);
  // console.log(result.data.response.body.items);
  res.json(result.data.response.body.items);
});

app.listen(PORT, () => {
  console.log(PORT + " 에서 작업중");
});
