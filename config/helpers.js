const path = require('path');
const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const sourceDir = path.join(__dirname, '..', 'src');
const mainPath = path.join(__dirname, '..', 'src/main.ts')
const outputDir = path.join(__dirname, '..', 'dist');
const port = process.env.WEBPACK_PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
const isHot = process.env.HMR === 'enabled';

function getMetadata() {
  return {
    title: 'Angular2 App',
    baseUrl: '/'
  };
}

function getDevTool() {
  if (isProduction) return 'source-map';
  if (isDevelopment) return 'cheap-module-source-map';
  if (isTest) return 'inline-source-map';
}

function getDebug() {
  return isDevelopment ? true : false;
}

function getEntry() {
  return {
    polyfills: path.join(sourceDir, 'polyfills.ts'),
    vendor: path.join(sourceDir, 'vendor.ts'),
    main: mainPath
  };
}

// TODO production specific output
function getOutput() {
  if (isDevelopment || isProduction) {
    return {
      path: outputDir,
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[name].[id].chunk.js'
    };
  }
  if (isTest) return null;
}

function getModulePreLoaders() {
  const preLoaders = [];

  preLoaders.push({
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [
      path.join(__dirname, '..', 'node_modules', 'rxjs'),
      path.join(__dirname, '..', 'node_modules', '@angular2-material'),
      path.join(__dirname, '..', 'node_modules', '@angular')
    ]
  });

  if (isTest) {
    preLoaders.push({
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [path.join(__dirname, '..', 'node_modules')]
    });
  }

  return preLoaders;
}

function getModuleLoaders() {
  const loaders = [];

  loaders.push(
    {
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader']
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      loaders: ['to-string', 'css', 'postcss', 'sass']
    },
    {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: [path.join(sourceDir, 'index.html')]
    }
  );

  return loaders;
}

function getModulePostLoaders() {}

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        HMR: JSON.stringify(process.env.HMR)
      }
    })
  ];

  if (isTest) return plugins;

  plugins.push(
    // https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
    new ForkCheckerPlugin(),

    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: path.join(sourceDir, 'index.html'),
      chunksSortMode: packageSort(['polyfills', 'vendor', 'main'])
    })
  );

  // https://www.npmjs.com/package/copy-webpack-plugin
  // plugins.push(new CopyWebpackPlugin([{ from: '', to: '' }]));

  if (isHot) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (isDevelopment) return plugins;

  plugins.push(
    new CleanWebpackPlugin(['!dist/.gitkeep', 'dist/**/*.*'], {
      verbose: true,
      root: path.join(__dirname)
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.optimize.DedupePlugin(),

    // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  );

  return plugins;
}

// https://github.com/AngularClass/angular2-webpack-starter/blob/master/config/helpers.js#L36
function packageSort(packages) {
  // packages = ['polyfills', 'vendor', 'main']
  var len = packages.length - 1;
  var first = packages[0];
  var last = packages[len];
  return function sort(a, b) {
    // polyfills always first
    if (a.names[0] === first) {
      return -1;
    }
    // main always last
    if (a.names[0] === last) {
      return 1;
    }
    // vendor before app
    if (a.names[0] !== first && b.names[0] === last) {
      return -1;
    } else {
      return 1;
    }
  }
}

function getDevServer() {
  if (isDevelopment && isHot) {
    return {
      contentBase: path.join(outputDir),
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: {
        colors: true,
        chunks: false
      },
      host: 'localhost',
      port: port
    };
  }
  if (isDevelopment && !isHot) {
    return {
      contentBase: path.join(outputDir),
      historyApiFallback: true,
      // hot: true,
      inline: true,
      progress: true,
      stats: {
        colors: true,
        chunks: false
      },
      host: 'localhost',
      port: port
    };
  }
  return null;
}

function getTsLintConfig() {
  if (isProduction) {
    return {
      emitErrors: true,
      failOnHint: true,
      resourcePath: sourceDir
    };
  }

  return {
    emitErrors: false,
    failOnHint: false,
    resourcePath: sourceDir
  };
}

function getNode() {
  if (isDevelopment) {
    return {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    };
  }

  return {
    global: 'window',
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
  };
}

module.exports.sourceDir = sourceDir;
module.exports.outputDir = outputDir;
module.exports.port = port;

module.exports.getMetadata = getMetadata;
module.exports.getDevTool = getDevTool;
module.exports.getDebug = getDebug;
module.exports.getEntry = getEntry;
module.exports.getOutput = getOutput;
module.exports.getModulePreLoaders = getModulePreLoaders;
module.exports.getModuleLoaders = getModuleLoaders;
module.exports.getPlugins = getPlugins;
module.exports.getDevServer = getDevServer;
module.exports.getTsLintConfig = getTsLintConfig;
module.exports.getNode = getNode;
