const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist') // eslint-disable-line
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: '.',
        context: './src/',
        ignore: ['*.js'],
        flatten: true
      }
    ])
  ]
}
