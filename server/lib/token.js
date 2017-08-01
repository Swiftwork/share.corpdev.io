const jwt = require('jwt-simple');
const environment = require('../../environment.js')(process.env.NODE_ENV);

module.exports.generate = (user) => {
  let expires = new Date();
  expires.setDate(expires.getDate() + 7);
  return jwt.encode({ iss: user.email, exp: expires.getTime() }, environment.TOKEN_SECRET);
};

module.exports.verify = (token, next) => {
  if (!token) {
    var notFoundError = new Error('Token not found');
    notFoundError.status = 404;
    return next(notFoundError);
  }

  if (jwt.decode(token, environment.TOKEN_SECRET) <= new Date().getTime()) {
    var expiredError = new Error('Token has expired');
    expiredError.status = 401;
    return next(expiredError);
  }
};
