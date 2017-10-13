const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');

module.exports = () => {
  const router = express.Router();

  router.get('/', auth.authorize, (request, response) => {
    rdb.getAll('users')
      .then((users) => {
        response.json(users);
      });
  });

  router.get('/:id', auth.authorize, (request, response, next) => {
    rdb.get('users', request.params.id)
      .then((user) => {
        if (!user) {
          let notFoundError = new Error('User not found');
          notFoundError.status = 404;
          return next(notFoundError);
        }

        response.json(user);
      });
  });

  router.post('/', auth.authorize, (request, response) => {
    auth.hash_password(request.body.password)
      .then((hash) => {
        let newUser = {
          name: request.body.name,
          email: request.body.email,
          password: hash
        };

        rdb.insert('users', newUser)
          .then((result) => {
            response.json(result);
          });
      });
  });

  router.put('/:id', auth.authorize, (request, response) => {
    rdb.get('users', request.params.id)
      .then((user) => {
        let updateUser = {
          name: request.body.user || user.name,
          email: request.body.email || user.email
        };

        rdb.update('user', user.id, updateUser)
          .then((results) => {
            response.json(results);
          });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.delete('users', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  return router;
}
