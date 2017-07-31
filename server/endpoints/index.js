/* Endpoint Controllers */
var users = require('./users.js');
var login = require('./login.js');
var topics = require('./topics.js');

module.exports = (app) => {

  app.use('/api/users', users);

  app.use('/api/login', login);

  app.use('/api/topics', topics);

  app.get('api/*', (req, res) => {
    res.status(501).send({ error: 'No such api' });
  });

};
