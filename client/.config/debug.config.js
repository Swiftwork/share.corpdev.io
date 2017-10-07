var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/* Import common configuration for debug and dist */
var environment = require('../../environment.js')('development');
var commonConfig = require('./common.config.js');
var cpus = require('os').cpus().length;

module.exports = merge.smart(commonConfig, {

  entry: {
    'hmr': 'webpack-hot-middleware/client',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader',
          /*
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              // 1 cpu for system and one for 1 cpu for the fork-ts-checker-webpack-plugin
              workers: cpus >= 4 ? cpus - 2 : 1,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // happyPackMode mode to speed-up compilation and reduce errors reported to webpack
              happyPackMode: true
            }
          },
          */
          'angular2-template-loader',
        ],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({ disable: true }),
    new webpack.HotModuleReplacementPlugin(),
    /*
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
      tslint: path.resolve(process.cwd(), 'client/.config/tslint.config.js'),
      checkSyntacticErrors: true,
    }),
    */
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
