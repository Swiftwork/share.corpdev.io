const bcrypt = require('bcrypt-nodejs');
const token = require('./token');

module.exports.authorize = (request, response, next) => {
  const map = request.headers['authorization'].split(' ');
  const bearer = map[map.indexOf('Bearer') + 1]
  token.verify(bearer, next);
  next();
};

module.exports.hash_password = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return reject(error);

      bcrypt.hash(password, salt, null, (error, hash) => {
        if (error) return reject(error);
        return resolve(hash);
      });
    });
  });
};

module.exports.authenticate = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, response) => {
      if (error) return reject(error);
      return resolve(response);
    });
  });
};
