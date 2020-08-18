const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'mapbox-gl-draw-freehand.js',
    path: path.resolve(__dirname, 'dist'),
  },
};