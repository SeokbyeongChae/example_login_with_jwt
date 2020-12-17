const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = 4001;

const privateKey = "test123";

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/login", (req, res) => {
  const token = jwt.sign({ foo: "bar" }, privateKey, { expiresIn: 15 });
  console.log("login..");
  console.dir(token);

  // res.cookie("sidd", token, {
  //   httpOnly: true,
  //   maxAge: 900000,
  // });

  // res.cookie("sidd", token);
  res.cookie("sidd", token, {
    maxAge: 86400000,
    httpOnly: true,
    domain: "localhost:3000/login",
  });
  // console.dir(req.cookies);
  /**
	 * {options}
	 	- maxAge : 현재 시간으로부터 만료 시간을 밀리초 단위로 설정
		- expires : cookie의 만료날짜를 GMT시간으로 설정
		- path : cookie의 경로, default는 "/"
		- domain : cookie의 domain name, default는 loaded
		- secure : https에서만 cookie를 사용할 수 있게 설정
		- httpOnly : 웹 서버를 통해서만 cookie에 접근할 수 있도록 설정
		- signed : cookie가 서명되어야 할 지를 결정
	 */

  // res.clearCookie(key); 쿠키삭제
  res.send(token);
});

app.post("/authorization", (req, res) => {
  // console.log(req.body.token);
  console.dir(jwt.verify(req.body.token, privateKey));

  res.send("welcome, " + req.body.token);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
