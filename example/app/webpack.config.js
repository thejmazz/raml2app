'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: ['whatwg-fetch', './app.js'],
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

module.exports = config
