'use strict';

const webpack = require('webpack');

const commonConfig = require('./webpack.config');

module.exports = Object.assign({}, commonConfig, {
  debug: false,

  devtool: undefined,

  output: Object.assign({}, commonConfig.output, {
    filename: 'rapid7-react-notification-banner-area.min.js'
  }),

  plugins: commonConfig.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        booleans: true,
        conditionals: true,
        drop_console: true,
        drop_debugger: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      sourceMap: false
    })
  ])
});
