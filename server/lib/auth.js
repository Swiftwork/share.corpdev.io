const bcrypt = require('bcrypt-nodejs');
const token = require('./token');

module.exports.authorize = (req, res, next) => {
  let bearer = '';
  if (req.headers['authorization']) {
    const map = req.headers['authorization'].split(' ');
    bearer = map[map.indexOf('Bearer') + 1]
  }
  token.verify(bearer, next);
  next();
};

module.exports.hash_password = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(error);

      bcrypt.hash(password, salt, null, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
};

module.exports.authenticate = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
};
