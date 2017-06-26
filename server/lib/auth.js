const bcrypt = require('bcrypt-nodejs');

module.exports.authorize = (request, response, next) => {
  let apiToken = request.headers['x-api-token'];
  token.verify(apiToken, next);
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