import 'core-js/es6';
import 'core-js/es7';

import 'zone.js/dist/zone';

import 'ts-helpers';

if (process.env.NODE_ENV === 'production') {
  // ...
}

if (process.env.NODE_ENV === 'development') {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
