/* Import */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const environment = require('../environment.js')(process.env.NODE_ENV);

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const endpoints = require('./endpoints/index.js');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(helmet());

/* Static Assets */
app.use(express.static(environment.DIRS.PUBLIC));
app.use('/content', express.static(environment.DIRS.CONTENT));
app.use('/static', express.static(environment.DIRS.STATIC));

//------------------------------------------------------------------------------------
// HOT RELOAD FOR DEVELOPMENT
//------------------------------------------------------------------------------------

if (process.env.NODE_ENV === 'development') {

  /* Require and setup server watcher */
  const chokidar = require('chokidar');
  const watcher = chokidar.watch(['./endpoints', './lib']);
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing server module cache')
      Object.keys(require.cache).forEach((id) => {
        if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
      });
    });
  });

  /* Require webpack for building */
  const webpack = require('webpack');
  const webpackConfig = require('../client/.config/debug.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  /* Setup Compiler */
  const compiler = webpack(webpackConfig);

  /* Webpack Compilation */
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/',
    hot: true,
    inline: true,
    stats: {
      colors: true,
    },
    historyApiFallback: true,
  }));

  /* Webpack Hot Module reload */
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    noInfo: true,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));

  /* Enpoints */
  endpoints(app, io);

  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
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

