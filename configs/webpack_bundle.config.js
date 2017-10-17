const webpack = require('webpack');
const path = require('path');

// Pass in opts to setup configs
//   opts.entry: the name of the entry file
const config = {

  entry: './src/snackbar.js',
  output: {
    path: path.resolve('.', 'vendor/assets/javascripts'),
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
    },
    {
      test: /\.scss$/,
      use:[
        'style-loader',
        'css-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: [path.resolve('.','/src')]
        }
      }]
    }]
  }
}

module.exports = config;
