import FreehandMode from '../src/index.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuZWhta2UiLCJhIjoiY2plYTl6b3c2MHg5ODJxbGV4aXR4Z3p6YSJ9.d3jSAbsqSmpJwyVcp9iXbw';
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