const express = require("express");
const morgan = require("morgan");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
const cheerio = require("cheerio");
const { text } = require("express");
const app = express();
dotenv.config();

app.set("port", process.env.PORT || 3001);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
const PORT = app.get("port");

app.get("/", (req, res) => {
  res.send("<h1>Hello Node!</h1>");
});

app.get("/daum/news", (req, res) => {
  // res.send("다음 뉴스 크롤링");
  const gethtml = async () => {
    try {
      return await axios.get("https://news.daum.net/"); //pormise
    } catch (error) {
      console.error(error);
    }
  };
  //promise then(), catch()
  gethtml().then((html) => {
    let retrunNewsList = [];
    // console.log(res);
    const $ = cheerio.load(html.data);
    const getNewsList = $("ul.list_newsissue").children("li");
    // => 함수는 this 취급안함.. 쓰려면 function 함수 사용
    getNewsList.each((idx, item) => {
      retrunNewsList.push({
        news: $(item).find("a").text().replaceAll("\n", "").trim(),
        url: $(item).find("a").attr("href"),
        img: $(item).find("img").attr("src"),
        company: $(item).find(".logo_cp img").attr("src"),
        category: $(item).find(".txt_category").text(),
      });
    });
    res.json(retrunNewsList);
  });
});

app.get("/result/daum_news", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/result_daum_news.html"));
});

app.get("/gmarket", (req, res) => {
  const getMarket = async () => {
    try {
      return await axios.get("https://www.gmarket.co.kr/");
    } catch (error) {
      console.error(error);
    }
  };
  getMarket().then((html) => {
    let catalog = [];
    const $ = cheerio.load(html.data);
    const getcatalog = $(".box__item .list__item").children("li");
    getcatalog.each((idx, item) => {
      catalog.push({
        link: $(item).find(".link__item").attr("href"),
        img: $(item).find(".link__item .box__image img").attr("src"), //이미지
        sale: $(item).find(".link__item .box__information .box__price .text__sale").text(), //가격
        price: $(item).find(".link__item .box__information .box__price .text__price").text(), //가격
        name: $(item).find(".link__item .box__information .text__name").text(), //상품명
        mall: $(item).find(".link__mall").text().split(">"), //회사
        mallUrl: $(item).find(".link__mall").attr("href"), //회사url
      });
    });
    res.json(catalog);
  });
});

app.listen(PORT, () => {
  console.log(PORT, " 에서 작업중");
});
