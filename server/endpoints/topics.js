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
    rdb.getAllNested('topics', 'articles', null, { index: 'order' })
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
        const group = [];
        const updateTopic = {
          id: topic.id,
          title: request.body.title || topic.title,
          articles: request.body.articles || topic.articles
        };

        if (typeof request.body.order == 'number')
          group.push(reOrder(topic.order, request.body.order));

        group.push(rdb.update('topics', updateTopic));

        Promise.all(group).then((results) => {
          response.json(results);
        }).catch((err) => {
          console.error(err);
          response.send(500);
        });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.delete('topics', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  /* HELPERS */

  function reOrder(index, target) {
    if (index == target) return;
    const descend = index < target;
    const lower = descend ? index : target;
    const upper = descend ? target : index;
    return rdb.getBetween('topics', lower, upper, { index: 'order', rightBound: descend ? 'open' : 'closed' })
      .then((topics) => {
        const mover = topics.find((topic) => topic.order == index);
        topics.forEach((topic) => topic.order += descend ? -1 : 1);
        mover.order = target + (descend ? -1 : 0);
        rdb.updateMulti('topics', topics);
      });
  }

  return router;
}
