const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// TODO: need to use config file
const constants = require("../common/constants");

// TODO: need to use config file
const privateKey = "key";

module.exports.createSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

module.exports.encryptPassword = (salt, password) => {
  return crypto.createHmac("sha256", salt).update(password).digest("base64");
};

module.exports.accessToken = (email) => {
  return jwt.sign({ email }, privateKey, constants.accessTokenOption);
};

module.exports.refreshToken = (email) => {
  return jwt.sign({ email }, privateKey, constants.refreshTokenOption);
};

module.exports.verifyToken = (token) => {
  try {
    const decryptedToken = jwt.verify(token, privateKey);
    return [undefined, decryptedToken];
  } catch (err) {
    return [err.message, undefined];
  }
};
