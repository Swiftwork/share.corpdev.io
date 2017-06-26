var path = require('path');
var extend = require('webpack-merge');
var webpack = require('webpack');

/* Import common configuration for dev and prod */
var commonConfig = require('./common.config.js');

module.exports = extend(true, commonConfig, {

  entry: {
    'hmr': 'webpack-hot-middleware/client',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['@angularclass/hmr-loader', 'awesome-typescript-loader', 'angular2-template-loader'],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
      },
    }),
  ],

  devtool: 'source-map',
});
