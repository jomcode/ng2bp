const path = require('path');
require('ts-node/register');

module.exports.config = {
  specs: [
    path.join(__dirname, '..', 'src/**/**.e2e.ts'),
    path.join(__dirname, '..', 'src/**/*.e2e.ts')
  ],
  exclude: [],
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
