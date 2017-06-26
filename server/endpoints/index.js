/* Endpoint Controllers */
var users = require('./users.js');
var login = require('./login.js');

module.exports = (app) => {

  app.use('/api/users', users);

  app.use('/api/login', login);

};