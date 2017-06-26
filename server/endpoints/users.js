const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');

const router = express.Router();

router.get('/', auth.authorize, (request, response) => {
  rdb.findAll('users')
    .then((users) => {
      response.json(users);
    });
});

router.get('/:id', auth.authorize, (request, response, next) => {
  rdb.find('users', request.params.id)
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

      rdb.save('users', newUser)
        .then((result) => {
          response.json(result);
        });
    });
});

router.put('/:id', auth.authorize, (request, response) => {
  rdb.find('users', request.params.id)
    .then((user) => {
      let updateUser = {
        name: request.body.user || user.name,
        email: request.body.email || user.email
      };

      rdb.edit('user', user.id, updateUser)
        .then((results) => {
          response.json(results);
        });
    });
});

router.delete('/:id', auth.authorize, (request, response) => {
  rdb.destroy('users', request.params.id)
    .then((results) => {
      response.json(results);
    });
});

module.exports = router;