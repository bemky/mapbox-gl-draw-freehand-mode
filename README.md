# Mapbox Freehand Draw Mode

This is a custom mode for [@mapbox/mapbox-gl-draw]() that adds draw functionality to the draw polygon mode.

## Demo
https://bemky.github.io/mapbox-gl-draw-freehand-mode/

## Dependencies
[@mapbox/mapbox-gl-draw](https://www.npmjs.com/package/mapbox-gl-draw)

[@turf/simplify](https://www.npmjs.com/package/@turf/simplify)

## Usage
### To Install:
    npm i mapbox-gl-draw-freehand-mode

### To Use:
```javascript
import FreehandMode from 'mapbox-gl-draw-freehand-mode'

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

## Configuration
### Simplification
By default FreehandMode will simplify. Turf's [simplify](https://www.npmjs.com/package/@turf/simplify) method takes a polygon and simplifies it based on a `tolerance`. The tolerance is corelated to meters, so tolerance must change based on the zoom, if not simplification will vary wildly based on zoom level. Thus, FreehandMode's simplify calculates a tolerance based on zoom.

You can configure you're own simplify method by redefing it on the object

#### Example removing simplification
```javascript
import FreehandMode from 'mapbox-gl-draw-freehand-mode';

FreehandMode.simplify = function (polygon, zoom) {}
```

#### Example with your own tolerance calculation
```javascript
import FreehandMode from 'mapbox-gl-draw-freehand';

FreehandMode.simplify = function (polygon, zoom) {
    simplify(polygon, {
        mutate: true,
        tolerance: 1 / Math.pow(2, zoom),
        highQuality: true
    });
}
```

## Development
Build or serve the example via [Webpack](https://webpack.js.org/)

### Build
    npm run build

### Serve
    npm run start
