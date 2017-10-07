const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');

module.exports = () => {

  const router = express.Router();

  router.get('/', (request, response) => {
    rdb.findAll('topics')
      .then((topics) => {
        response.json(topics);
      });
  });

  router.get('/:id', (request, response, next) => {
    rdb.find('topics', request.params.id)
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

    rdb.save('topics', newTopic)
      .then((result) => {
        response.json(result);
      });
  });

  router.put('/:id', auth.authorize, (request, response) => {
    rdb.find('topics', request.params.id)
      .then((topic) => {
        let updateTopic = {
          title: request.body.title || topic.title,
          articles: request.body.articles || topic.articles
        };

        rdb.edit('topic', topic.id, updateTopic)
          .then((results) => {
            response.json(results);
          });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.destroy('topics', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  return router;
}
