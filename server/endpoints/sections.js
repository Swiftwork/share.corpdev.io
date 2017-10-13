const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');

module.exports = () => {

  const router = express.Router();

  router.get('/', (request, response) => {
    rdb.getAll('sections')
      .then((sections) => {
        response.json(sections);
      });
  });

  router.get('/:id', (request, response, next) => {
    const ids = request.params.id.split(',');
    let find;
    if (ids.length > 1) {
      find = rdb.getMulti('sections', ids)
    } else {
      find = rdb.get('sections', ids[0]);
    }
    find.then((section) => {
      if (!section) {
        let notFoundError = new Error('Section not found');
        notFoundError.status = 404;
        return next(notFoundError);
      }

      response.json(section);
    });
  });

  router.post('/', auth.authorize, (request, response) => {
    let newSection = {
      title: request.body.title,
      body: request.body.body,
    };

    rdb.insert('sections', newSection)
      .then((result) => {
        response.json(result);
      });
  });

  router.post('/operations', auth.authorize, (request, response) => {
    let sections;

    /* Save */
    sections = request.body.save;
    if (sections) {
      if (Array.isArray(sections)) {
        /* TODO: any manipulations required */
      } else {
        /* TODO: any manipulations required */
      }
      rdb.insert('sections', sections)
        .then((result) => {
          response.json(result);
        });
    }

    /* Edit */
    sections = request.body.edit;
    if (sections) {
      if (Array.isArray(sections)) {
        /* TODO: any manipulations required */
        rdb.updateMulti('sections', sections)
          .then((result) => {
            response.json(result);
          });
      } else {
        /* TODO: any manipulations required */
        rdb.update('sections', section.id, sections)
          .then((result) => {
            response.json(result);
          });
      }
    }

    /* Destroy */
    sections = request.body.destroy;
    if (sections) {
      if (Array.isArray(sections)) {
        /* TODO: any manipulations required */
        rdb.deleteMulti('sections', sections.map(section => section.id))
          .then((result) => {
            response.json(result);
          });
      } else {
        /* TODO: any manipulations required */
        rdb.delete('sections', section.id)
          .then((result) => {
            response.json(result);
          });
      }
    }
  });

  router.put('/:id', auth.authorize, (request, response) => {
    rdb.get('sections', request.params.id)
      .then((section) => {
        let updateSection = {
          title: request.body.title || section.title,
          sections: request.body.sections || section.sections
        };

        rdb.update('section', section.id, updateSection)
          .then((results) => {
            response.json(results);
          });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.delete('sections', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  return router;
}
