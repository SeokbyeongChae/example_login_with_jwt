const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const accountLib = require("./lib/account");
const constants = require("./common/constants");

const app = express();
const port = 4001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const accounts = {};
const refreshTokens = {};

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (accounts.hasOwnProperty(email)) {
    return res.status(422).send();
  }

  const salt = accountLib.createSalt();
  const encryptPassword = accountLib.encryptPassword(salt, password);
  accounts[email] = {
    email,
    salt,
    encryptPassword,
  };

  const accessToken = accountLib.accessToken(email);
  res.cookie("access_token", accessToken, constants.accessTokenCookieOption);

  const refreshToken = accountLib.refreshToken(email);
  refreshTokens[accessToken] = refreshToken;

  res.status(200).send({
    email,
  });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!accounts.hasOwnProperty(email)) {
    return res.status(422).send();
  }

  const account = accounts[email];
  const salt = account.salt;
  const encryptPassword = accountLib.encryptPassword(salt, password);
  if (encryptPassword.toString("base64") !== account.encryptPassword.toString("base64")) {
    return res.status(401).send();
  }

  const accessToken = accountLib.accessToken(email);
  res.cookie("access_token", accessToken, constants.accessTokenCookieOption);

  const refreshToken = accountLib.refreshToken(email);
  refreshTokens[accessToken] = refreshToken;

  res.status(200).send({
    email,
  });

  // res.setHeader("SET-COOKIE", `sid=${token}`);
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
});

app.post("/logout", (req, res) => {
  const accessToken = req.cookies.access_token;
  if (accessToken) {
    delete refreshTokens[accessToken];
    res.clearCookie("access_token");
  }

  res.status(200).send();
});

app.post("/loginWithToken", (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) return res.status(401).send();

  const [accessTokenErr, accessTokenResult] = accountLib.verifyToken(accessToken);
  if (accessTokenErr) {
    switch (accessTokenErr) {
      case "jwt expired": {
        const refreshToken = refreshTokens[accessToken];
        if (!refreshToken) {
          res.clearCookie("access_token");
          return res.status(401).send();
        }

        const [refreshTokenErr, refreshTokenResult] = accountLib.verifyToken(refreshToken);
        if (refreshTokenErr) {
          delete refreshTokens[accessToken];
          res.clearCookie("access_token");
          return res.status(401).send();
        }

        const email = refreshTokenResult.email;
        const newAccessToken = accountLib.accessToken(email);
        res.cookie("access_token", newAccessToken, constants.accessTokenCookieOption);

        refreshTokens[newAccessToken] = refreshTokens[accessToken];
        delete refreshTokens[accessToken];

        res.status(200).send({
          email,
        });

        return;
      }
      default: {
        delete refreshTokens[accessToken];
        res.clearCookie("access_token");
        return res.status(401).send();
      }
    }
  }

  const email = accessTokenResult.email;
  const account = accounts[email];
  if (!account) {
    delete refreshTokens[accessToken];
    res.clearCookie("access_token");
    return res.status(401).send();
  }

  const newAccessToken = accountLib.accessToken(email);
  res.cookie("access_token", newAccessToken, constants.accessTokenCookieOption);

  refreshTokens[newAccessToken] = refreshTokens[accessToken];
  delete refreshTokens[accessToken];
  res.status(200).send({ email });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
