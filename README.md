# Mapbox Free Draw Mode

This is a custom mode for [@mapbox/mapbox-gl-draw]() that simplifies drawing to a single free drawing.

## !! WORK IN PROGRESS !!
Right now this is just the framework, development of actual features is in progress

## Demo
https://bemky.github.io/mapbox-gl-draw-free-mode/

## Usage

To install:

`npm i @bemky/mapbox-gl-draw-free-mode`

To add to MapboxDraw:

```js
var FreeDrawMode = require('@bemky/mapbox-gl-draw-free-mode');

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v8',
  center: [40, -74.50],
  zoom: 9
});

var modes = MapboxDraw.modes;
modes.free = FreeDrawMode;
var Draw = new MapboxDraw({ modes: modes });

map.addControl(Draw)

map.on('load', function() {
  Draw.changeMode('free');
});
```

## Build
`grunt build`

## Serve
`grunt serve`

## Deploy Demo
`grunt deploy`
