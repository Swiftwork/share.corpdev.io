/* Endpoint Controllers */
module.exports = (app, io) => {

  app.use('/api/login', require('./login.js'));

  app.use('/api/users', require('./users.js')(io));

  app.use('/api/topics', require('./topics.js')(io));

  app.use('/api/articles', require('./articles.js')(io));

  app.use('/api/sections', require('./sections.js')(io));

  app.use('/api/assets', require('./assets.js')(io));

  app.get('api/*', (req, res) => {
    res.status(501).send({ error: 'No such api' });
  });

};
