var path = require('path');
var extend = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Import common configuration for debug and dist */
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
    new ExtractTextPlugin({ disable: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        styleLoader: {
          sourceMap: true,
        },
        cssLoader: {
          sourceMap: true,
        },
        postcssLoader: {
          sourceMap: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"',
      },
    }),
  ],

  devtool: 'cheap-eval-source-map',
});
