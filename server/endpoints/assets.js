const path = require('path');
const express = require('express');
const rdb = require('../lib/database.js');
const auth = require('../lib/auth.js');
const utils = require('../lib/utils.js');
const environment = require('../../environment.js')(process.env.NODE_ENV);

module.exports = (io) => {

  const router = express.Router();

  /* SOCKET */

  rdb.connection.then((connection) => {
    rdb.subscribeAll('assets').then((cursor) => {
      cursor.each((err, change) => {
        if (err) throw err;
        io.emit('assets', change.new_val ? change.new_val.id : null);
      })
    });
  });

  /* XHR */

  router.get('/', (request, response) => {
    rdb.findAll('assets')
      .then((assets) => {
        response.json(assets);
      });
  });

  router.get('/images', (request, response) => {
    rdb.findAll('assets', doc => doc('mimetype').match('^image'))
      .then((assets) => {
        response.json(assets);
      });
  });

  router.get('/videos', (request, response) => {
    rdb.findAll('assets', doc => doc('mimetype').match('^videos'))
      .then((assets) => {
        response.json(assets);
      });
  });

  router.get('/code', (request, response) => {
    rdb.findAll('assets', doc => doc('mimetype').match('^text'))
      .then((assets) => {
        response.json(assets);
      });
  });

  router.get('/:id', (request, response, next) => {
    const ids = request.params.id.split(',');
    let find;
    if (ids.length > 1) {
      find = rdb.findMulti('assets', ids)
    } else {
      find = rdb.find('assets', ids[0]);
    }
    find.then((asset) => {
      if (!asset) {
        let notFoundError = new Error('Asset not found');
        notFoundError.status = 404;
        return next(notFoundError);
      }

      response.json(asset);
    });
  });

  router.post('/', auth.authorize, (request, response) => {
    if (utils.isEmpty(request.files))
      return res.status(400).send('No files were uploaded.');
    let files = Array.isArray(request.files['files[]']) ? request.files['files[]'] : [request.files['files[]']];

    const metadata = files.map(file => {
      const filename = path.parse(file.name);
      return {
        name: filename.name,
        extension: filename.ext.substring(1),
        mimetype: file.mimetype,
        modified: new Date(),
      };
    });

    rdb.save('assets', metadata)
      .then((result) => {
        result.generated_keys.forEach((id, index) => {
          const file = files[index];
          const contentPath = path.resolve(environment.DIRS.CONTENT, id + path.extname(file.name));
          file.mv(contentPath, err => {
            if (err)
              throw err;
          });
        });
        response.json(result);
      });
  });

  router.put('/:id', auth.authorize, (request, response) => {
    rdb.find('assets', request.params.id)
      .then((asset) => {
        let updateAsset = {
          title: request.body.title || asset.title,
          assets: request.body.assets || asset.assets
        };

        rdb.edit('asset', asset.id, updateAsset)
          .then((results) => {
            response.json(results);
          });
      });
  });

  router.delete('/:id', auth.authorize, (request, response) => {
    rdb.destroy('assets', request.params.id)
      .then((results) => {
        response.json(results);
      });
  });

  return router;
}
