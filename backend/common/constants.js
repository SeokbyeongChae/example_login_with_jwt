module.exports.accessTokenOption = {
  expiresIn: 15,
};

module.exports.accessTokenCookieOption = {
  maxAge: 1209600000,
  httpOnly: true,
};

module.exports.refreshTokenOption = {
  expiresIn: 1209600000,
};
