const path = require('path')

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist') // eslint-disable-line
  },
  module: {
    rules: [
      {
        test: /\.(png|css|html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
          }
        ]
      }
    ]
  }
}
