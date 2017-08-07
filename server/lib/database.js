const rdb = require('rethinkdb');
const environment = require('../../environment.js')(process.env.NODE_ENV);

module.exports.connection = rdb.connect(environment.DATABASE)
  .then((connection) => {

    /* HELPERS */

    getMulti = (tableName, ids) => rdb.table(tableName).getAll(rdb.args(ids));

    /* METHODS */

    module.exports.find = (tableName, id) => {
      return rdb.table(tableName).get(id).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.findMulti = (tableName, ids) => {
      return getMulti(tableName, ids).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.findAll = (tableName) => {
      return rdb.table(tableName).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.findBy = (tableName, fieldName, value) => {
      return rdb.table(tableName).filter(rdb.row(fieldName).eq(value)).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.findIndexed = (tableName, query, index) => {
      return rdb.table(tableName).getAll(query, { index: index }).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.subscribe = (tableName, id) => {
      return rdb.table(tableName).get(id).changes().run(connection)
        .then((cursor) => {
          return cursor;
        });
    };

    module.exports.subscribeMulti = (tableName, ids) => {
      return getMulti(tableName, ids).changes().run(connection)
        .then((cursor) => {
          return cursor;
        });
    };

    module.exports.subscribeAll = (tableName, options) => {
      return rdb.table(tableName).changes().run(connection)
        .then((cursor) => {
          return cursor;
        });
    };

    module.exports.save = (tableName, documents) => {
      return rdb.table(tableName).insert(documents).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.edit = (tableName, document) => {
      console.log(document);
      return rdb.table(tableName).get(document.id).update(document).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.editMulti = (tableName, documents) => {
      return rdb.expr(documents).forEach(document => {
        module.exports.edit(tableName, document)
      })
        .run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.destroy = (tableName, id) => {
      return rdb.table(tableName).get(id).delete().run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.destroyMulti = (tableName, ids) => {
      return getMulti(tableName, ids).delete().run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };
  });
