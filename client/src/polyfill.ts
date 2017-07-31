//------------------------------------------------------------------------------------
// POLYFILLS
//------------------------------------------------------------------------------------

import 'core-js/es6';
import 'core-js/es7/reflect';
import 'core-js/shim';
import 'zone.js/dist/zone';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/sv';

if (process.env.NODE_ENV === 'production') {
  // Production
} else {
  // Development
  Error.stackTraceLimit = 10;
  require('zone.js/dist/long-stack-trace-zone');
}