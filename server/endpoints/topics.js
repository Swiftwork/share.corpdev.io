const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');

module.exports = () => {

  const router = express.Router();

  router.get('/', (request, response) => {
    rdb.getAll('topics')
      .then((topics) => {
        response.json(topics);
      });
  });

  router.get('/nested', (request, response) => {
    rdb.getAllNested('topics', null, 'articles')
      .then((topics) => {
        response.json(topics);
      });
  });

  router.get('/:id', (request, response, next) => {
    rdb.get('topics', request.params.id)
      .then((topic) => {
        if (!topic) {
          let notFoundError = new Error('Topic not found');
          notFoundError.status = 404;
          return next(notFoundError);
        }

        response.json(topic);
      });
  });

  router.post('/', auth.authorize, (request, response) => {
    let newTopic = {
      title: request.body.title,
      articles: request.body.articles || [],
    };

    rdb.insert('topics', newTopic)
      .then((result) => {
        response.json(result);
      });
  });

  router.put('/:id', auth.authorize, (request, response) => {
    rdb.get('topics', request.params.id)
      .then((topic) => {
        let updateTopic = {
          title: request.body.title || topic.title,
          articles: request.body.articles || topic.articles
        };

        rdb.update('topic', topic.id, updateTopic)
          .then((results) => {
            response.json(results);
          });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.delete('topics', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  return router;
}
