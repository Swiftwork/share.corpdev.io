var path = require('path');
var testConfig = require('./test.config.js');
var browsers = ['Chrome', 'Firefox'];

switch (process.platform) {
  case 'win32':
    browsers.push('IE'); // Does not work with Windows Service
    break;
  case 'darwin':
    browsers.push('Safari');
    break;
}

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['source-map-support', 'jasmine'],

    files: [
      { pattern: './karma-test-shim.js', watched: false }
    ],

    preprocessors: {
      './karma-test-shim.js': ['webpack']
    },

    webpack: testConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['spec', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: browsers,
    singleRun: true,
    concurrency: Infinity,

    junitReporter: {
      outputDir: path.resolve(process.cwd(), 'test_results'),
    }
  };

  config.set(_config);
};
