/* Import */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');

const environment = require('../environment.js')(process.env.NODE_ENV);

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const uploader = require('multer')({ dest: environment.DIRS.CONTENT });

const endpoints = require('./endpoints/index.js');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

/* Static Assets */
app.use(express.static(path.resolve(__dirname, '../database/content')));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/static', express.static(path.resolve(__dirname, 'static')));

//------------------------------------------------------------------------------------
// HOT RELOAD FOR DEVELOPMENT
//------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'development') {

  /* Require webpack for building */
  const webpack = require('webpack');
  const webpackConfig = require('../client/.config/debug.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  /* Setup Compiler */
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    hot: true,
    inline: true,
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    noInfo: true,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  /* Enpoints */
  endpoints(app, io);

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function (err, result) {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });

} else {

  /* Enpoints */
  endpoints(app, io);

  app.get('*', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public/index.html'));
  });
}

//------------------------------------------------------------------------------------
// SOCKET IO
//------------------------------------------------------------------------------------

io.on('connection', (client) => {
  console.log('Client connected...', client.id);
});

//------------------------------------------------------------------------------------
// SERVER
//------------------------------------------------------------------------------------

/* Init Server */
server.listen(environment.PORT, environment.HOST, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Website is hosted at http://${host}:${port}`);
});

