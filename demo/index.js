var mapboxgl = require('mapbox-gl');
var MapboxDraw = require('@mapbox/mapbox-gl-draw');
var FreeMode = require('@mapbox/mapbox-gl-draw-free-mode');

var element = document.createElement('div');
document.querySelector('body').appendChild(element);

element.style.height = "90vh";

const map = new mapboxgl.Map({
    container: element,
    style: 'https://tiles.stadiamaps.com/styles/osm_bright.json',
    center: [-122.431272, 37.778008],
    zoom: 12
});

var modes = MapboxDraw.modes;
modes.free = FreeMode;

var Draw = new MapboxDraw({ modes: modes });
map.addControl(Draw, 'top-left');

map.on('load', function() {
    Draw.changeMode('free');
});