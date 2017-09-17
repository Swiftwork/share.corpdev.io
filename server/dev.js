const path = require('path');

module.exports = {

  devMode: (app) => {
    console.log('Server started in development mode.');

    /* Require and setup server watcher */
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(['./server/endpoints', './server/lib']);
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

    return compiler;
  },

  devRoutes: (compiler, router) => {
    /* Webpack Path to index.html */
    router.get('*', (req, res) => {
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
  }
};
