# Mapbox Free Draw Mode

This is a custom mode for [@mapbox/mapbox-gl-draw]() that adds draw functionality to the draw polygon mode.

## Demo
https://bemky.github.io/mapbox-gl-draw-freehand-mode/

## Usage


### Browser
Load [mapbox-gl-draw-freehand.js](https://github.com/bemky/mapbox-gl-draw-freehand-mode/blob/master/dist/mapbox-gl-draw-freehand.js)

`MapboxDraw.modes.draw_polygon = require('@mapbox/mapbox-gl-draw-freehand-mode').default;`

### Modularly
To install:

`npm i mapbox-gl-draw-free-mode`

To add to MapboxDraw:

```js
require('mapbox-gl-draw-free-mode');

// Then build map with draw like usual
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [40, -74.50],
  zoom: 9
});
var Draw = new MapboxDraw();
map.addControl(Draw)

```

## Build
`grunt build`

## Serve
`grunt serve`

## Deploy Demo
`grunt deploy`
