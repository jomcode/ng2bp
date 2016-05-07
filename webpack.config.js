const path = require('path');
const webpack = require('webpack');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const sourceDir = path.join(__dirname, 'src');
const mainPath = path.join(__dirname, 'src/main.ts')
const outputDir = path.join(__dirname, 'dist');
const port = process.env.WEBPACK_PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production';
const isHot = !isProduction && process.env.NODE_ENV === 'development';

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

function getMetadata() {
  return {
    title: 'Angular2 App',
    baseUrl: '/'
  };
}

function getDevTool() {
  if (isProduction) return 'source-map';
  return 'cheap-module-source-map';
}

function getEntry() {
  // dev
  return {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    main: mainPath
  };
}

function getOutput() {
  // dev
  return {
    path: outputDir,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[name].[id].chunk.js'
  };
}

function getModuleLoaders() {
  const loaders = [];

  loaders.push({
    test: /\.ts$/,
    loaders: ['awesome-typescript-loader']
  });

  loaders.push(
    {
      test: /\.scss$/,
      loaders: ['to-string', 'css', 'postcss', 'sass']
    },
    {
      test: /\.html$/,
      loader: 'raw-loader',
      exclude: [path.join(__dirname, 'src/index.html')]
    }
  );

  return loaders;
}

function getModulePreLoaders() {
  const preLoaders = [];

  if (isProduction) {
    preLoaders.push({
      test: /\.ts$/,
      loader: 'tslint-loader',
      exclude: [path.join(__dirname, 'node_modules')]
    });
  }

  preLoaders.push({
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [
      path.join(__dirname, 'node_modules', 'rxjs'),
      path.join(__dirname, 'node_modules', '@angular2-material'),
      path.join(__dirname, 'node_modules', '@angular')
    ]
  });

  return preLoaders;
}

function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      chunksSortMode: packageSort(['polyfills', 'vendor', 'main'])
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'polyfills']
    })
  ];

  // https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
  plugins.push(new ForkCheckerPlugin());

  // https://www.npmjs.com/package/copy-webpack-plugin
  // plugins.push(new CopyWebpackPlugin([{ from: '', to: '' }]));

  if (isProduction) {
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
  }

  if (isHot) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return plugins;
}

function getDevServer() {
  if (!isProduction) {
    return {
      contentBase: path.join(__dirname, 'public'),
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
  if (process.env.NODE_ENV === 'development') {
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

module.exports = {
  devtool: getDevTool(),

  debug: !isProduction,

  entry: getEntry(),
  output: getOutput(),

  module: {
    preLoaders: getModulePreLoaders(),
    loaders: getModuleLoaders()
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  postcss: () => [autoprefixer],

  plugins: getPlugins(),
  devServer: getDevServer(),
  tslint: getTsLintConfig(),
  metadata: getMetadata(),
  node: getNode()
};
