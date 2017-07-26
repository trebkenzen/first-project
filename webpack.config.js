var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client', 'public');
var APP_DIR = path.resolve(__dirname + '/client/src');

// console.log(BUILD_DIR);

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'client', 'public')
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;