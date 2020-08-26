const path = require('path');

module.exports = [{
  entry: './src/index.js',
  output: {
    filename: 'mapbox-gl-draw-freehand.js',
    path: path.resolve(__dirname, 'dist'),
  },
}, {
  entry: './docs-src/index.js',
  devtool: 'inline-source-map',
  node: {
    fs: 'empty'
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs')
  }
}];