var path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'webpack-main.js'
  }
};

