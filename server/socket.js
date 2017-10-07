const rdb = require('./lib/database.js');

const tableListener = (io, table) => {
  rdb.subscribeAll(table).then((cursor) => {
    cursor.each((err, change) => {
      if (err) throw err;
      io.emit(table, change.new_val ? change.new_val.id : null);
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
