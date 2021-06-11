const path = require('path');

module.exports = [{
  entry: './docs/index.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    port: 9000
  },
  output: {
    filename: 'index.compiled.js',
    path: path.resolve(__dirname, 'docs')
  }
}]