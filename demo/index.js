var mapboxgl = require('mapbox-gl');
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
require('@mapbox/mapbox-gl-draw-freehand-mode');

var element = document.createElement('div');
document.querySelector('body').appendChild(element);

element.style.height = "90vh";

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuZWhta2UiLCJhIjoiY2plYTl6b3c2MHg5ODJxbGV4aXR4Z3p6YSJ9.d3jSAbsqSmpJwyVcp9iXbw';
const map = new mapboxgl.Map({
    container: element,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-122.431272, 37.778008],
    zoom: 12
});

const Draw = new MapboxDraw();
map.addControl(Draw, 'top-left');

map.on('draw.create', geojsonFromDrawing);
map.on('draw.update', geojsonFromDrawing);
map.on('draw.delete', geojsonFromDrawing);

function geojsonFromDrawing(){
    console.log(Draw.getAll());
}
