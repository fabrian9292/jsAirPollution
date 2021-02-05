var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "production",
  entry: './src/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  plugins : [new HtmlWebpackPlugin({
    template: ".src/index.html"
  }),
            new Dotenv({
    path: './src/.env',
    safe: true
  })
], 

  module : {
      rules: [
        {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
        },
        /* {
        test: /\.html$/,
        use: ["html-loader"],
        }  */
      ] 
  }

};

