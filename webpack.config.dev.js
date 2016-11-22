'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.config');

const PORT = 3000;

module.exports = Object.assign({}, commonConfig, {
  devServer: {
    contentBase: './dist',
    inline: true,
    port: PORT,
    stats: {
      assets: false,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: true,
      version: false
    }
  },

  entry: './DEV_ONLY/App.js',

  externals: undefined,

  module: Object.assign({}, commonConfig.module, {
    loaders: commonConfig.module.loaders.concat([{
      include: [
        path.resolve(__dirname, 'DEV_ONLY')
      ],
      loader: 'babel',
      test: /\.js$/
    }])
  }),

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: `http://localhost:${PORT}/`
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new HtmlWebpackPlugin()
  ]
});
