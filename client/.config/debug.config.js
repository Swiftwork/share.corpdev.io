var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Import common configuration for debug and dist */
var environment = require('../../environment.js')('development');
var commonConfig = require('./common.config.js');

module.exports = merge.smart(commonConfig, {

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
        'NODE_ENV': `"${environment.ENV}"`,
        'HOST': `"${environment.HOST}"`,
        'PORT': `${environment.PORT}`,
        'CONTENT_DIR': `"${environment.DIRS.CONTENT}"`,
      },
    }),
  ],

  devtool: 'cheap-module-eval-source-map',
});
