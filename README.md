# Mapbox Free Draw Mode

This is a custom mode for [@mapbox/mapbox-gl-draw]() that adds draw functionality to the draw polygon mode.

## Demo
https://bemky.github.io/mapbox-gl-draw-freehand-mode/

## Usage
To install:

`npm i mapbox-gl-draw-freehand-mode`
or 
Load [mapbox-gl-draw-freehand.js](https://github.com/bemky/mapbox-gl-draw-freehand-mode/blob/master/dist/mapbox-gl-draw-freehand.js)

```js
FreehandMode = require('mapbox-gl-draw-freehand-mode');

const Draw = new MapboxDraw({
  modes: Object.assign(MapboxDraw.modes, {
    draw_polygon: FreehandMode
  })
});

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [40, -74.50],
  zoom: 9
});
map.addControl(Draw)

```

## Build
`grunt build`

## Serve
`grunt serve`

## Deploy Demo
`grunt deploy`
