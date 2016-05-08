const path = require('path');

const helpers = require('./helpers');

require('ts-node/register');

module.exports.config = {
  specs: [
    path.join(helpers.sourceDir, '/**/**.e2e.ts'),
    path.join(helpers.sourceDir, 'src/**/*.e2e.ts')
  ],
  exclude: [],
  baseUrl: 'http://localhost:8080',
  framework: 'jasmine2',
  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },

  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  useAllAngular2AppRoots: true
};
