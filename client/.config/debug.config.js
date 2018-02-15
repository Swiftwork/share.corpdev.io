const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/* CONSTANTS */
const CPUS = require('os').cpus().length;
const SOURCE_DIR = path.resolve(process.cwd(), 'client', 'src');
const CONFIG_DIR = path.resolve(process.cwd(), 'client', '.config');

/* PLUGINS
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { LoaderOptionsPlugin, EnvironmentPlugin, HotModuleReplacementPlugin, NamedModulesPlugin, SourceMapDevToolPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin } = require('@angular/cli/plugins/webpack');

/* NODE_MODULES */
const nodeModules = path.resolve(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(SOURCE_DIR, '$$_gendir', 'node_modules');

/* Import common configuration for debug and dist */
const environment = require('../../environment.js')('development');
const commonConfig = require('./common.config.js');

module.exports = merge.smart(commonConfig, {
  entry: {
    'hmr': 'webpack-hot-middleware/client',
  },

  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          '@angularclass/hmr-loader',
          /*
          {
            loader: 'awesome-typescript-loader',
            options: {
              silent: true,
              configFileName: path.join(SOURCE_DIR, 'tsconfig.json'),
            },
          },
          */
          'cache-loader',
          {
            loader: 'thread-loader',
            options: {
              // 1 cpu for system and one for 1 cpu for the fork-ts-checker-webpack-plugin
              workers: CPUS >= 4 ? CPUS - 2 : 1,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // happyPackMode mode to speed-up compilation and reduce errors reported to webpack
              happyPackMode: true
            }
          },
          'angular2-template-loader',
        ],
      },
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.join(SOURCE_DIR, 'tsconfig.json'),
      tslint: path.join(CONFIG_DIR, 'tslint.config.js'),
      checkSyntacticErrors: true,
    }),
    new NamedModulesPlugin(),
    new NamedLazyChunksWebpackPlugin(),
    //new CheckerPlugin(),
    new ExtractTextPlugin({
      disable: true,
    }),
    new CommonsChunkPlugin({
      name: [
        'vendor'
      ],
      minChunks: (module) => module.resource && (
        module.resource.startsWith(nodeModules) ||
        module.resource.startsWith(realNodeModules) ||
        module.resource.startsWith(genDirNodeModules)
      ),
      chunks: [
        'main', 'vendor',
      ]
    }),
    new SourceMapDevToolPlugin({
      filename: '[file].map[query]',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash]',
      sourceRoot: 'webpack:///'
    }),
    new LoaderOptionsPlugin({
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
    new EnvironmentPlugin({
      NODE_ENV: 'development',
      HOST: environment.HOST,
      PORT: environment.PORT,
      CONTENT_DIR: environment.DIRS.CONTENT,
    }),
  ],

  devServer: {
    hot: true,
  },

  devtool: 'cheap-module-eval-source-map',
});
