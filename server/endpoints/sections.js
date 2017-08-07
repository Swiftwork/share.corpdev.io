const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');

module.exports = (io) => {

  const router = express.Router();

  /* SOCKET */

  rdb.connection.then((connection) => {
    rdb.subscribeAll('sections').then((cursor) => {
      cursor.each((err, change) => {
        if (err) throw err;
        io.emit('sections', change.new_val ? change.new_val.id : null);
      })
    });
  });

  /* XHR */

  router.get('/', (request, response) => {
    rdb.findAll('sections')
      .then((sections) => {
        response.json(sections);
      });
  });

  router.get('/:id', (request, response, next) => {
    const ids = request.params.id.split(',');
    let find;
    if (Array.isArray(ids)) {
      find = rdb.findAll('sections', ids)
    } else {
      find = rdb.find('sections', ids[0]);
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

    rdb.save('sections', newSection)
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
      rdb.save('sections', sections)
        .then((result) => {
          response.json(result);
        });
    }

    /* Edit */
    sections = request.body.edit;
    if (sections) {
      if (Array.isArray(sections)) {
        /* TODO: any manipulations required */
        rdb.editMulti('sections', sections.map(section => section.id), sections)
          .then((result) => {
            response.json(result);
          });
      } else {
        /* TODO: any manipulations required */
        rdb.edit('sections', section.id, sections)
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
        rdb.destroyMulti('sections', sections.map(section => section.id))
          .then((result) => {
            response.json(result);
          });
      } else {
        /* TODO: any manipulations required */
        rdb.destroy('sections', section.id)
          .then((result) => {
            response.json(result);
          });
      }
    }
  });

  router.put('/:id', auth.authorize, (request, response) => {
    rdb.find('sections', request.params.id)
      .then((section) => {
        let updateSection = {
          title: request.body.title || section.title,
          sections: request.body.sections || section.sections
        };

        rdb.edit('section', section.id, updateSection)
          .then((results) => {
            response.json(results);
          });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.destroy('sections', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  return router;
}
