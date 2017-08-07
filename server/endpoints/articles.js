const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');

module.exports = (io) => {

  const router = express.Router();

  /* SOCKET */

  rdb.connection.then((connection) => {
    rdb.subscribeAll('articles').then((cursor) => {
      cursor.each((err, change) => {
        if (err) throw err;
        io.emit('articles', change.new_val ? change.new_val.id : null);
      })
    });
  });

  /* XHR */

  router.get('/', (request, response) => {
    rdb.findAll('articles')
      .then((articles) => {
        response.json(articles);
      });
  });

  router.get('/:id', (request, response, next) => {
    const ids = request.params.id.split(',');
    let find;
    if (ids.length > 1) {
      find = rdb.findMulti('articles', ids)
    } else {
      find = rdb.find('articles', ids[0]);
    }
    find.then((article) => {
      if (!article) {
        let notFoundError = new Error('Article not found');
        notFoundError.status = 404;
        return next(notFoundError);
      }

      response.json(article);
    });
  });

  router.post('/', auth.authorize, (request, response) => {
    let newArticle = {
      title: request.body.title,
      articles: request.body.articles || [],
    };

    rdb.save('articles', newArticle)
      .then((result) => {
        response.json(result);
      });
  });

  router.put('/:id', auth.authorize, (request, response) => {
    rdb.find('articles', request.params.id)
      .then((article) => {
        let updateArticle = {
          title: request.body.title || article.title,
          articles: request.body.articles || article.articles
        };

        rdb.edit('article', article.id, updateArticle)
          .then((results) => {
            response.json(results);
          });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.destroy('articles', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  return router;
}
