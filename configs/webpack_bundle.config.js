const webpack = require('webpack');
const path = require('path');

// Pass in opts to setup configs
//   opts.entry: the name of the entry file
const config = {

  entry: './src/snackbar.js',
  output: {
    path: path.resolve('.', 'assets/js'),
    filename: 'snackbar.min.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
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
