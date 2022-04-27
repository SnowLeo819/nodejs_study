const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const methodOverride = require("method-override");
const MongoClient = require("mongodb").MongoClient;
// const morgan = require("morgan");

// 외부에 저장한 정보 가져오기
dotenv.config();
app.set("port", process.env.PORT || 3001);
app.set("MONGO_URL", process.env.MONGO_URL);
const PORT = app.get("port");
const MONGO_URL = app.get("MONGO_URL");

app.set("view engine", "ejs"); // templaye  engine
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// 정적폴더 설정
app.use(express.static(path.join(__dirname, "/public")));
app.use("/upload", express.static(path.join(__dirname, "/upload")));

// 몽고디비 연결 설정
let db = null;
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
  console.log("DB연결");
  if (err) {
    console.error("31 ==", err);
    return;
  }
  db = client.db("todo");
});

const storage = multer.diskStorage({
  // 이미지 저장 폴더 지정
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "/upload"));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const fileUpload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index", { title: "index" });
});

app.get("/insert", (req, res) => {
  res.render("insert");
});

app.post("/insert", fileUpload.single("poster"), (req, res) => {
  console.log(req.file);
  const _title = req.body.title;
  const _date = req.body.date;
  const _genre = req.body.genre;
  const _desc = req.body.desc;
  const _point = req.body.point;
  const _poster = "/upload/" + req.file.filename;

  db.collection("movie").insertOne(
    {
      title: _title,
      date: _date,
      genre: _genre,
      desc: _desc,
      point: _point,
      poster: _poster,
    },
    (err, result) => {
      if (err) {
        console.error("77 ==", err);
        return;
      }
      console.log("80 입력성공 = ", result);
      // res.send("fileuploaded");
    }
  );
  res.redirect("/list");
});

app.get("/list", (req, res) => {
  db.collection("movie")
    .find()
    .toArray((err, result) => {
      if (err) {
        console.error("92 ==", err);
        return;
      }
      res.render("list", { movieList: result });
      // res.json({ movieList: result });
    });
});

app.listen(PORT, () => {
  console.log(PORT, " 에서 작업중");
});
