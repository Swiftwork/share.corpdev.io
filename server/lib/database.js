const rdb = require('rethinkdb');
const environment = require('../../environment.js')(process.env.NODE_ENV);

module.exports.connection = rdb.connect(environment.DATABASE)
  .then((connection) => {

    /* HELPERS */

    const getMulti = (tableName, ids) => rdb.table(tableName).getAll(rdb.args(ids));

    /* METHODS */

    module.exports.get = (tableName, id) => {
      return rdb.table(tableName).get(id).run(connection);
    };

    module.exports.getMulti = (tableName, ids) => {
      return getMulti(tableName, ids).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.getAll = (tableName, filter, orderBy) => {
      let table = rdb.table(tableName);
      if (filter) table = table.filter(filter);
      if (orderBy) table = table.orderBy(orderBy);
      return table.run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.getBetween = (tableName, lower, upper, options) => {
      return rdb.table(tableName).between(lower, upper, options).run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };

    module.exports.getAllNested = (tableName, secondTableName, filter, orderBy) => {
      let table = rdb.table(tableName);
      if (filter) table = table.filter(filter);
      if (orderBy) table = table.orderBy(orderBy);
      return table.map((doc1) => {
        const merge = {};
        merge[secondTableName] = doc1(secondTableName).map((doc2) => {
          return rdb.table(secondTableName).get(doc2);
        });
        return doc1.merge(merge);
      }).run(connection)
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
      return rdb.table(tableName).get(id).changes().run(connection);
    };

    module.exports.subscribeMulti = (tableName, ids) => {
      return getMulti(tableName, ids).changes().run(connection);
    };

    module.exports.subscribeAll = (tableName, options, filter, orderBy) => {
      let table = rdb.table(tableName);
      if (filter) table = table.filter(filter);
      if (orderBy) table = table.orderBy(orderBy);
      return table.changes().run(connection);
    };

    module.exports.insert = (tableName, documents) => {
      return rdb.table(tableName).insert(documents).run(connection);
    };

    module.exports.update = (tableName, document) => {
      return rdb.table(tableName).get(document.id).update(document).run(connection);
    };

    module.exports.updateMulti = (tableName, documents) => {
      return rdb.expr(documents).forEach(document =>
        rdb.table(tableName).get(document('id')).update(document))
        .run(connection);
    };

    module.exports.delete = (tableName, id) => {
      return rdb.table(tableName).get(id).delete().run(connection);
    };

    module.exports.deleteMulti = (tableName, ids) => {
      return getMulti(tableName, ids).delete().run(connection)
        .then((cursor) => {
          return cursor.toArray();
        });
    };
  });
