const rdb = require('rethinkdb');
const environment = require('../../environment.js')(process.env.NODE_ENV);

module.exports.connection = rdb.connect(environment.DATABASE)
  .then((connection) => {

    module.exports.find = (tableName, id) => {
      return rdb.table(tableName).get(id).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.subscribe = (tableName, id) => {
      return rdb.table(tableName).get(id).changes().run(connection)
        .then((cursor) => {
          return cursor;
        });
    };

    module.exports.findAll = (tableName) => {
      return rdb.table(tableName).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.subscribeAll = (tableName, options) => {
      return rdb.table(tableName).changes().run(connection)
        .then((cursor) => {
          return cursor;
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

    module.exports.save = (tableName, object) => {
      return rdb.table(tableName).insert(object).run(connection)
        .then((result) => {
          return result;
        });
    };

    module.exports.edit = (tableName, id, object) => {
      return rdb.table(tableName).get(id).update(object).run(connection)
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
  });
