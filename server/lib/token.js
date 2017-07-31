const jwt = require('jwt-simple');
const config = require('../config.js');

module.exports.generate = (user) => {
  let expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return jwt.encode({ iss: user.email, exp: expires.getTime() }, config.TOKEN_SECRET);
};

module.exports.verify = (token, next) => {
  if (!token) {
    var notFoundError = new Error('Token not found');
    notFoundError.status = 404;
    return next(notFoundError);
  }

  if (jwt.decode(token, config.TOKEN_SECRET) <= new Date().getTime()) {
    var expiredError = new Error('Token has expired');
    expiredError.status = 401;
    return next(expiredError);
  }
};
