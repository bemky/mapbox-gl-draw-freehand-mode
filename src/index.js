import doubleClickZoom from '@mapbox/mapbox-gl-draw/src/lib/double_click_zoom';
import Constants from '@mapbox/mapbox-gl-draw/src/constants';
import DrawPolygon from '@mapbox/mapbox-gl-draw/src/modes/draw_polygon';
import dragPan from '../src/lib/drag_pan';
import simplify from "@turf/simplify";

const FreeDraw = DrawPolygon;

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
        var tolerance = (3 / ((this.map.getZoom()-4) * 150)) - 0.001 // https://www.desmos.com/calculator/b3zi8jqskw
        simplify(state.polygon, {
            mutate: true,
            tolerance: isFinite(tolerance) ? tolerance : 0.01,
            highQuality: true
        });
            
        this.fireUpdate();
        this.changeMode(Constants.modes.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
    }
}

FreeDraw.onTouchEnd = function(state, e) {
    this.onMouseUp(state, e)
}

FreeDraw.fireUpdate = function() {
    this.map.fire(Constants.events.UPDATE, {
        action: Constants.updateActions.MOVE,
        features: this.getSelected().map(f => f.toGeoJSON())
    });
};

export default FreeDraw
