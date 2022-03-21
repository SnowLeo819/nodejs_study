// import..
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv"); // .env 파읽 읽어주는 라이브러리
dotenv.config(); // dotenv 라이브러리 실행

// 포트설정
app.set("port", process.env.PORT || 3000);
const PORT = app.get("port");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 메인 페이지
app.get("/", (req, res) => {
  // send : 문자 , sendFile : 파일 , json : json , render : 템플릿 엔진(view page) 리턴
  res.send("<h1>Hello Node.js!</h1>");
});

// 검색결과
app.get("/result/news", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/result.html"));
});
app.get("/result/movie", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/result_movie.html"));
});
app.get("/result/image", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/result_image.html"));
});

// ID,Secret 가져오기,, 헤더 정의
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const headers = { "X-Naver-Client-ID": clientID, "X-Naver-client-Secret": clientSecret };

// 뉴스검색 데이터
app.get("/naver/news", async (req, res) => {
  const start = req.query.start;
  const searchWord = req.query.searchWord;
  console.log(searchWord);
  // const clientID = process.env.clientID;
  // const clientSecret = process.env.clientSecret;
  const url = "https://openapi.naver.com/v1/search/news.json?query=" + encodeURI(searchWord) + "&start=" + start;
  // const headers = { "X-Naver-Client-ID": clientID, "X-Naver-client-Secret": clientSecret };
  const result = await axios.get(url, { headers });
  console.log(result.data.items);
  // res.json({ news: result.data.items });
  res.json(result.data.items);
});

// 영화검색 데이터
app.get("/naver/movie", async (req, res) => {
  const start = req.query.start;
  const searchWord = req.query.searchWord;
  // const searchGenre = req.query.searchGenre;
  const url = "https://openapi.naver.com/v1/search/movie.json?query=" + encodeURI(searchWord) + "&display=10&start=" + start;
  const result = await axios.get(url, { headers });
  // console.log(result.data.items);
  res.json({ total: result.data.total, items: result.data.items });
});

//이미지 검색 데이터
app.get("/naver/image", async (req, res) => {
  const start = req.query.start;
  const searchWord = req.query.searchWord;
  const url = "https://openapi.naver.com/v1/search/image?query=" + encodeURI(searchWord) + "&display=10&start=" + start + "&sort=sim";
  const result = await axios.get(url, { headers });
  console.log(result.data.items);
  // res.json(result.data);
  res.json({ total: result.data.total, items: result.data.items });
});

app.listen(PORT, () => {
  console.log(PORT, " 에서 작업중");
});
