const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

/* CONSTANTS */
const SOURCE_DIR = path.resolve(process.cwd(), 'client', 'src');
const CONFIG_DIR = path.resolve(process.cwd(), 'client', '.config');

/* PLUGINS */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { LoaderOptionsPlugin, EnvironmentPlugin, HashedModuleIdsPlugin, NormalModuleReplacementPlugin } = require('webpack');
const { PurifyPlugin } = require('@angular-devkit/build-optimizer');
const { SuppressExtractedTextChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { ModuleConcatenationPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');

/* Import common configuration for debug and dist */
const environment = require('../../environment.js')('production');
const commonConfig = require('./common.config.js');

module.exports = merge.smart(commonConfig, {

  output: {
    filename: '[name].[chunkhash:20].bundle.js',
    chunkFilename: '[id].[chunkhash:20].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          },
          '@ngtools/webpack'
        ]
      }
    ]
  },

  plugins: [
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        htmlLoader: { // TODO: Needed to workaround Angular's html syntax => #id [bind] (event) *ngFor
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/],
          ],
          customAttrAssign: [/\)?\]?=/],
        },
      },
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash:20].bundle.css',
    }),
    new SuppressExtractedTextChunksWebpackPlugin(),
    new ModuleConcatenationPlugin(),
    new AngularCompilerPlugin({
      mainPath: 'main.ts',
      platform: 0,
      hostReplacementPaths: {
        'environments/environment.ts': 'environments/environment.prod.ts'
      },
      sourceMap: false,
      tsConfigPath: 'src/tsconfig.json',
      compilerOptions: {}
    }),
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      HOST: environment.HOST,
      PORT: environment.PORT,
      CONTENT_DIR: environment.DIRS.CONTENT,
    }),
    new PurifyPlugin(),
    new UglifyJsPlugin({
      test: /\.js$/i,
      extractComments: false,
      sourceMap: false,
      cache: false,
      parallel: false,
      uglifyOptions: {
        output: {
          ascii_only: true,
          comments: false
        },
        ecma: 5,
        warnings: false,
        ie8: false,
        mangle: {
          // EVRY component resolver requires function names
          keep_fnames: true,
        },
        compress: {
          pure_getters: true,
          passes: 3,
          keep_fnames: true,
        }
      }
    }),
  ],
});
