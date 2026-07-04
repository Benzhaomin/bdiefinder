/* eslint-disable filenames/match-regex */
/* eslint eslint-comments/no-use: off */

// eslint-disable-next-line no-undef, import/no-commonjs
module.exports = {
  entry: "./src/js/app.js",
  module: {
    rules: [
      {
        test: /\.(png|css|html)$/,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
    ],
  }
}
