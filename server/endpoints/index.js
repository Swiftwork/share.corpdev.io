const path = require('path');
const express = require('express');

/* Endpoint Controllers */
module.exports = () => {
  const router = express.Router();

  /* API */

  router.use('/api/login', require('./login.js'));

  router.use('/api/users', require('./users.js')());

  router.use('/api/topics', require('./topics.js')());

  router.use('/api/articles', require('./articles.js')());

  router.use('/api/sections', require('./sections.js')());

  router.use('/api/assets', require('./assets.js')());

  router.get('api/*', (req, res) => {
    res.status(501).send({ error: 'No such api' });
  });

  return router;
};
