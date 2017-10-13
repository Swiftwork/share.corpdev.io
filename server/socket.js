const rdb = require('./lib/database.js');

const tableListener = (io, table) => {
  rdb.subscribeAll(table).then((cursor) => {
    cursor.each((err, change) => {
      if (err) throw err;
      if (change.new_val && change.old_val)
        io.emit(table, { action: 'update', id: change.new_val.id });
      else if (change.new_val)
        io.emit(table, { action: 'insert', id: change.new_val.id });
      else
        io.emit(table, { action: 'delete', id: change.old_val.id });
    })
  });
};

module.exports = (io) => {
  io.on('connection', (client) => {
    console.log('Client connected...', client.id);
  });

  rdb.connection.then((connection) => {
    tableListener(io, 'topics');
    tableListener(io, 'articles');
    tableListener(io, 'sections');
    tableListener(io, 'assets');
  });
};
