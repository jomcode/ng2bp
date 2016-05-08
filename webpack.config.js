const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const helpers = require('./config/helpers');

module.exports = {
  metadata: helpers.getMetadata(),
  devtool: helpers.getDevTool(),
  debug: helpers.getDebug(),
  entry: helpers.getEntry(),
  output: helpers.getOutput(),
  module: {
    preLoaders: helpers.getModulePreLoaders(),
    loaders: helpers.getModuleLoaders()
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  plugins: helpers.getPlugins(),
  devServer: helpers.getDevServer(),
  tslint: helpers.getTsLintConfig(),
  node: helpers.getNode(),
  postcss: () => [autoprefixer]
};
