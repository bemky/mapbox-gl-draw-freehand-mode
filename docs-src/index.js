import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import FreehandMode from '../src/index';

var element = document.createElement('div');
document.querySelector('body').appendChild(element);

element.style.height = "90vh";

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuZWhta2UiLCJhIjoiY2plYTl6b3c2MHg5ODJxbGV4aXR4Z3p6YSJ9.d3jSAbsqSmpJwyVcp9iXbw';
const map = new mapboxgl.Map({
    container: element,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-122, 37],
    zoom: 12
});

const Draw = new MapboxDraw({
  modes: Object.assign(MapboxDraw.modes, {
    draw_polygon: FreehandMode
  })
});

map.addControl(Draw, 'top-left');

map.on('draw.create', geojsonFromDrawing);
function geojsonFromDrawing(){
    console.log(arguments, Draw.getAll());
}