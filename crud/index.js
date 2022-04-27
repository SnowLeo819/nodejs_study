const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cli = require("nodmon/lib/cli");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const MongoClient = require("mongodb").MongoClient;
dotenv.config();

const session = require("express-session");
const passport = require("passport"); // 로그인할때 어떻게 할건지
const LocalStrategy = require("passport-local").Strategy; //  로그인전략

app.set("port", process.env.PORT || 3001);
app.set("MONGO_URL", process.env.MONGO_URL);
const PORT = app.get("port");
const MONGO_URL = app.get("MONGO_URL");
app.set("view engine", "ejs"); // 템플릿 엔진.. ejs, pug(jade), handlebar
app.use(express.static(path.join(__dirname, "/public")));
app.use(morgan("dev"));
app.use(methodOverride("_method"));

// 세션 만들기
app.use(session({ secret: "비밀코드자리", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// json형태 데이터 받을때 기본..
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 몽고디비 연결
let db = null;
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
  console.log("DB연결");
  if (err) {
    console.log(err);
    return;
  }
  db = client.db("todo");
  // db.collection("post").insertOne({ name: "파누시아", age: 29 }, (err, result) => {
  //   console.log("입력성공");
  // });
});

// 로그인 성공 실패시 페이지 보이기..
app.post("/login", passport.authenticate("local", { successRedirect: "/list", failureRedirect: "/fail" }), (req, res) => {});

// passport local
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "password",
      session: true,
      passReqToCallback: flase,
    },
    (_id, _password, done) => {
      console.log(_id, "===", _password);
      db.collection("users").findOne({ id: _id }, (err, result) => {
        if (err) return done(err);
        if (!result) return done(null, false, { message: "존재하지 않는 아이디 입니다." });
        if (result) {
          if (_password === result.password) {
            console.log("로그인 성공");
            return done(null, result);
          } else {
            console.log("로그인 실패");
            return done(null, false, { message: "비밀번호 확인 하세요" });
          }
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("79===", user);
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  db.collection("users").findOne({ id: id }, (err, result) => {
    done(null, result);
  });
});

app.get("/mypage", isLogged, (req, res) => {
  res.render("mypage");
});

function isLogged(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.write(`<script>alert(로그인 먼저 ㄱ);location.href="/login"</script>`);
  }
}

//화면 보여주기
app.get("/", (req, res) => {
  res.render("index", { title: "server 에서 넘긴 Hello ejs", desc: "server가 보낸 desc" }); // 뒷부분 ejs 확장자는 생략가능
});

app.get("/insert", (req, res) => {
  res.render("insert");
});

app.get("/list", (req, res) => {
  db.collection("post")
    .find()
    .toArray((err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(result);
      res.render("list", { todoList: result });
    });
});

app.post("/insertProcess", (req, res) => {
  const _title = req.body.title;
  const _date = req.body.date;
  console.log(_title + "===" + _date);
  db.collection("counter").findOne({ name: "total" }, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const count = result.count;
    console.log("갯수 = ==", count);
    db.collection("post").insertOne({ _id: count + 1, title: _title, date: _date }, (err, result) => {
      // console.log("입력성공");
      // update operation
      db.collection("counter").updateOne({ name: "total" }, { $inc: { count: 1 } }, (err, result) => {});
      res.redirect("/list");
    });
  });
});

app.get("/detail/:id", (req, res) => {
  // console.log(req.params.id);
  const id = parseInt(req.params.id);
  console.log(id);
  db.collection("post").findOne({ _id: id }, (err, result) => {
    if (result) {
      console.log(result);
      res.render("detail", { id: result.id, title: result.title, date: result.date });
    }
  });
});

app.delete("/delete", (req, res) => {
  const id = parseInt(req.body.id);
  // console.log(id);
  db.collection("post").deleteOne({ _id: id }, (err, result) => {
    if (result.deletedCount > 0) {
      // res.redirect("/list");
      res.json({ delete: "OK" });
    }
  });
  // res.end();
});

app.get("/edit/:id", (req, res) => {
  // id 받아서 값 출력 findOne
  const id = parseInt(req.params.id);
  db.collection("post").findOne({ _id: id }, (err, result) => {
    if (result) {
      // res.send("edit");
      res.render("detail", { id: result.id, title: result.title, date: result.date });
    }
  });
});

// 수정할때 많이 사용.. methodOverride 필요함
app.put("/edit", (req, res) => {
  const id = parseInt(req.body.id);
  const _title = req.body.title;
  const _date = req.body.date;
  db.collection("post").updateOne({ _id: id }, { $set: { title: _title, date: _date } }, (err, result) => {
    if (result.modifiedCount > 0) {
      console.log(result);
      res.redirect("/list");
    }
  });
  // res.send("edit put");
});

app.get("/search", (req, res) => {
  // 1 데이터 받기
  // 2 데이터 뿌리기
  console.log(req.query.search_word);
  res.render("search");
});

app.listen(PORT, () => {
  console.log(PORT + " 에서 작업중..");
});
