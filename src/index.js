const CommonSelectors = require('@mapbox/mapbox-gl-draw/src/lib/common_selectors');
const doubleClickZoom = require('@mapbox/mapbox-gl-draw/src/lib/double_click_zoom');
const Constants = require('@mapbox/mapbox-gl-draw/src/constants');
const isEventAtCoordinates = require('@mapbox/mapbox-gl-draw/src/lib/is_event_at_coordinates');
const createVertex = require('@mapbox/mapbox-gl-draw/src/lib/create_vertex');
const DrawPolygon = require('@mapbox/mapbox-gl-draw/src/modes/draw_polygon');
const dragPan = require('../src/lib/drag_pan');
const Simplify = require('../src/lib/simplify');
const FreeDraw = module.exports = DrawPolygon;

FreeDraw.onSetup = function() {
    const polygon = this.newFeature({
        type: Constants.geojsonTypes.FEATURE,
        properties: {},
        geometry: {
            type: Constants.geojsonTypes.POLYGON,
            coordinates: [[]]
        }
    });

    this.addFeature(polygon);

    this.clearSelectedFeatures();
    doubleClickZoom.disable(this);
    dragPan.disable(this);
    this.updateUIClasses({ mouse: Constants.cursors.ADD });
    this.activateUIButton(Constants.types.POLYGON);
    this.setActionableState({
        trash: true
    });

    return {
        polygon,
        currentVertexPosition: 0,
        dragMoving: false
    };
};

FreeDraw.onDrag = FreeDraw.onTouchMove = function (state, e){
    state.dragMoving = true;
    this.updateUIClasses({ mouse: Constants.cursors.ADD });
    state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
    state.currentVertexPosition++;
    state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
}

FreeDraw.onMouseUp = function (state, e){
    if (state.dragMoving) {
        var coordinates = state.polygon.coordinates[0];
        var points = Simplify.points(coordinates.map(function(lnglat){
            var point = this.map.project(lnglat);
            return {"X": point.x, "Y": point.y}
        }));
        coordinates = points[0].map(function(point){
            var coordinate = this.map.unproject({x: point.x, y: point.y});
            return [coordinate.lng, coordinate.lat];
        });
        
        this.deleteFeature([state.polygon.id], { silent: true });
        state.polygon = this.newFeature({
            type: Constants.geojsonTypes.FEATURE,
            properties: {},
            geometry: {
                type: Constants.geojsonTypes.POLYGON,
                coordinates: [coordinates]
            }
        });
        this.addFeature(state.polygon);
            
        this.fireUpdate();
        this.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
    }
}

FreeDraw.fireUpdate = function() {
    this.map.fire(Constants.events.UPDATE, {
        action: Constants.updateActions.MOVE,
        features: this.getSelected().map(f => f.toGeoJSON())
    });
};