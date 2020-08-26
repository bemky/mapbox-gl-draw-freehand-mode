const path = require('path');

module.exports = {
  entry: './docs-src/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    port: 9000,
    hot: true
  },
  devtool: 'inline-source-map',
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs')
  }
}