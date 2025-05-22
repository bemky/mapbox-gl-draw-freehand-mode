import FreehandMode from '../src/index.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuZWhta2UiLCJhIjoiY21hemlta3VlMGxhOTJqcHBkd3I5dXZnaiJ9.NzonVD9l39XPYIkIfyFi9w';
  var map = new mapboxgl.Map({
  container: document.getElementById('map'),
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-94.737236, 	32.514885],
  zoom: 12
});

var Draw = new MapboxDraw({
  modes: Object.assign(MapboxDraw.modes, {
    draw_polygon: FreehandMode
  })
});

map.addControl(Draw, 'top-left');
map.on('draw.create', geojsonFromDrawing);
function geojsonFromDrawing(){
    console.log(arguments, Draw.getAll());
}