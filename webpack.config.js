const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist') // eslint-disable-line
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery'
          },
          {
            loader: 'expose-loader',
            options: '$'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
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
