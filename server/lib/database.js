const rdb = require('rethinkdb');
const environment = require('../../environment.js')(process.env.NODE_ENV);

module.exports.connection = rdb.connect(environment.DATABASE)
  .then((connection) => {

    /* HELPERS */

    getMulti = (tableName, ids) => rdb.table(tableName).getAll(rdb.args(ids));

    /* METHODS */

    module.exports.get = (tableName, id) => {
      return rdb.table(tableName).get(id).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.getMulti = (tableName, ids) => {
      return getMulti(tableName, ids).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.getAll = (tableName, filter) => {
      const table = filter ? rdb.table(tableName).filter(filter) : rdb.table(tableName);
      return table.run(connection)
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

    module.exports.subscribeAll = (tableName, options, filter) => {
      const table = filter ? rdb.table(tableName).filter(filter) : rdb.table(tableName);
      return table.changes().run(connection)
        .then((cursor) => {
          return cursor;
        });
    };

    module.exports.insert = (tableName, documents) => {
      return rdb.table(tableName).insert(documents).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.update = (tableName, document) => {
      console.log(document);
      return rdb.table(tableName).get(document.id).update(document).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.updateMulti = (tableName, documents) => {
      return rdb.expr(documents).forEach(document =>
        rdb.table(tableName).get(document('id')).update(document))
        .run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.delete = (tableName, id) => {
      return rdb.table(tableName).get(id).delete().run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.deleteMulti = (tableName, ids) => {
      return getMulti(tableName, ids).delete().run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };
  });
