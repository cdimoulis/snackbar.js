const webpack = require('webpack');
const path = require('path');

const config = {

  entry: './src/snackbar.js',
  output: {
    path: path.resolve('.', 'vendor/assets/javascripts'),
    filename: 'snackbar.js',
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules|configs)/,
      include: /(src)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  }
}

module.exports = config;
