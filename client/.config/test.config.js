var path = require('path');
var extend = require('webpack-merge');
var webpack = require('webpack');

module.exports = {

  resolve: {
    modules: [
      path.resolve(process.cwd(), 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader',
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(process.cwd(), 'src/app'),
        ],
        loader: 'null-loader',
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(process.cwd(), 'src/app'),
        ],
        loader: 'raw-loader',
      },
    ],
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /(.+)?angular(\\|\/)core(.+)?/,
      path.resolve(process.cwd(), 'src')
    ),
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    }),
  ],
};
