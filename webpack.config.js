const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

/* options common to all build types: (pre-)loaders, linters, etc. */

module.exports = {
  cache: true,

  debug: true,

  devtool: '#cheap-module-eval-source-map',

  entry: path.join(__dirname, 'src', 'js', 'index.js'),

  eslint: {
    configFile: '.eslintrc',
    emitError: true,
    failOnError: true,
    failOnWarning: false,
    formatter: require('eslint-friendly-formatter')
  },

  externals: {
    react: {
      amd: 'react',
      commonjs2: 'react',
      commonjs: 'react',
      root: 'React'
    }
  },

  module: {
    preLoaders: [
      {
        exclude: /test/,
        include: path.resolve(__dirname, 'src', 'js'),
        loader: 'eslint',
        test: /\.js$/
      }
    ],

    loaders: [{
      include: path.resolve(__dirname, 'src', 'js'),
      loader: 'babel-loader',
      test: /\.js$/
    }, {
      cacheable: true,
      exclude: [
        path.resolve(__dirname, 'node_modules', 'lib')
      ],
      include: [
        /node_modules/
      ],
      loaders: [
        'style',
        `css?sourceMap`,
        `sass?sourceMap`
      ],
      test: /\.scss$/
    }, {
      cacheable: true,
      exclude: [
        /node_modules/,
        path.resolve(__dirname, 'src', 'scss')
      ],
      loaders: [
        'style',
        `css?sourceMap`,
        'postcss',
        `sass?sourceMap`
      ],
      test: /\.scss$/
    }, {
      include: [
        path.resolve(__dirname, 'src', 'scss'),
        path.resolve(__dirname, 'node_modules', 'lib')
      ],
      loaders: [
        'style',
        `css?modules&localIdentName=[folder]__[name]__[local]&sourceMap&importLoaders=1`,
        'postcss',
        `sass?sourceMap`
      ],
      test: /\.scss$/
    }, {
      cacheable: true,
      loaders: [
        'style',
        `css?sourceMap`
      ],
      test: /\.css$/
    }, {
      cacheable: true,
      loader: 'url?limit=10000&mimetype=application/font-woff',
      test: /.woff(2)?(?:\?.*|)$/
    }, {
      cacheable: true,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
      test: /\.ttf(?:\?.*|)?$/
    }, {
      cacheable: true,
      loader: 'file',
      test: /\.eot(?:\?.*|)?$/
    }, {
      cacheable: true,
      loader: 'file?name=img/[name].[ext]',
      test: /\.ico(?:\?.*|)?$/
    }, {
      cacheable: true,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
      test: /\.svg(?:\?.*|)?$/
    }, {
      cacheable: true,
      loaders: [
        'file?hash=sha512&digest=hex',
        'image-webpack'
      ],
      test: /\.(jpe?g|png|gif)(?:\?.*|)$/i
    }]
  },

  output: {
    filename: 'rapid7-react-notification-banner-area.js',
    library: 'rapid7-react-notification-banner-area',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'lib')
  },

  plugins: [
    /* make NODE_ENV available at runtime */
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ],

  postcss: function() {
    return [
      autoprefixer
    ];
  },

  resolve: {
    extensions: [
      '',
      '.js'
    ],

    /* Allows you to require('models/myModel') instead of needing relative paths */
    fallback: [
      path.join(__dirname, 'src')
    ],

    root: __dirname
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'node_modules', 'foundation-sites', 'scss'),
      path.resolve(__dirname, 'node_modules', 'rapid7-styles', 'styles', 'scss')
    ]
  }
};
