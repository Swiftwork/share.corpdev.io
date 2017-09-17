const path = require('path');
const express = require('express');

/* Endpoint Controllers */
module.exports = (io) => {
  const router = express.Router();

  /* API */

  router.use('/api/login', require('./login.js'));

  router.use('/api/users', require('./users.js')(io));

  router.use('/api/topics', require('./topics.js')(io));

  router.use('/api/articles', require('./articles.js')(io));

  router.use('/api/sections', require('./sections.js')(io));

  router.use('/api/assets', require('./assets.js')(io));

  router.get('api/*', (req, res) => {
    res.status(501).send({ error: 'No such api' });
  });

  return router;
};
