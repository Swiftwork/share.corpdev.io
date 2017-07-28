var path = require('path');
var extend = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AotPlugin = require('@ngtools/webpack').AotPlugin;

/* Import common configuration for dev and prod */
var commonConfig = require('./common.config.js');

module.exports = extend(true, commonConfig, {

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['@ngtools/webpack'],
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css?[hash]'),
    new AotPlugin({
      tsConfigPath: path.resolve(process.cwd(), 'tsconfig-aot.json'),
      entryModule: path.resolve(process.cwd(), 'client/src/app/app.module#AppModule'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
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
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      mangle: {
        keep_fnames: true, // https://github.com/angular/angular/issues/10618
        screw_ie8: true,
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
  ]
});
