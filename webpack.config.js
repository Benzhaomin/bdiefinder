/* eslint eslint-comments/no-use: off */
/* global __dirname */
const path = require('path')
const glob = require("glob")

let entry = path.resolve(__dirname, "src/js/app.js")
let outputPath = path.resolve(__dirname, 'dist')

if (process.env.TESTBUILD) {
  entry = glob.sync(__dirname + "/src/js/*.test.js");
  outputPath = path.resolve(__dirname, 'test-dist');
}

module.exports = {
  entry: entry,
  output: {
    filename: 'app.js',
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.(png|css|html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]'},
          },
        ],
      },
    ],
  },
}
