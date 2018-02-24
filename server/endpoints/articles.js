const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');
const { asyncMiddleware } = require('../lib/utils.js');

module.exports = () => {

  const router = express.Router();

  router.get('/', asyncMiddleware(async (req, res, next) => {
    const articles = await rdb.getAll('articles');
    res.json(articles);
  }));

  router.get('/:id', asyncMiddleware(async (req, res, next) => {
    const ids = req.params.id.split(',');
    let find;
    if (ids.length > 1) {
      find = rdb.getMulti('articles', ids)
    } else {
      find = rdb.get('articles', ids[0]);
    }
    const articles = await find;
    res.json(articles);
  }));

  router.post('/', auth.authorize, asyncMiddleware(async (req, res, next) => {
    let newArticle = {
      title: req.body.title,
      articles: req.body.articles || [],
    };
    const changeset = await rdb.insert('articles', newArticle);
    res.json(changeset);
  }));

  router.put('/:id', auth.authorize, asyncMiddleware(async (req, res, next) => {
    const article = await rdb.get('articles', req.params.id);
    let updateArticle = {
      id: article.id,
      title: req.body.title || article.title,
      preamble: req.body.preamble || article.preamble,
      articles: req.body.articles || article.articles || [],
    };
    const changeset = await rdb.update('articles', updateArticle);
    res.json(changeset);
  }));

  router.delete('/:id', auth.authorize, asyncMiddleware(async (req, res, next) => {
    const changeset = await rdb.delete('articles', req.params.id);
    res.json(changeset);
  }));

  return router;
}
