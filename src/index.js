import DrawPolygon from '@mapbox/mapbox-gl-draw/src/modes/draw_polygon';
import {geojsonTypes, cursors, types, updateActions, modes, events} from '@mapbox/mapbox-gl-draw/src/constants';
import simplify from "@turf/simplify";

const FreehandMode = Object.assign({}, DrawPolygon)

FreehandMode.onSetup = function() {
    const polygon = this.newFeature({
        type: geojsonTypes.FEATURE,
        properties: {},
        geometry: {
            type: geojsonTypes.POLYGON,
            coordinates: [[]]
        }
    });

    this.addFeature(polygon);
    this.clearSelectedFeatures();
    
    // disable dragPan
    setTimeout(() => {
        if (!this.map || !this.map.dragPan) return;
        this.map.dragPan.disable();
    }, 0);

    this.updateUIClasses({ mouse: cursors.ADD });
    this.activateUIButton(types.POLYGON);
    this.setActionableState({
        trash: true
    });

    return {
        polygon,
        currentVertexPosition: 0,
        dragMoving: false
    };
};

FreehandMode.onDrag = FreehandMode.onTouchMove = function (state, e){
    state.dragMoving = true;
    this.updateUIClasses({ mouse: cursors.ADD });
    state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
    state.currentVertexPosition++;
    state.polygon.updateCoordinate(`0.${state.currentVertexPosition}`, e.lngLat.lng, e.lngLat.lat);
}

FreehandMode.onMouseUp = function (state, e){
    if (state.dragMoving) {
        this.simplify(state.polygon);
        this.fireUpdate();
        this.changeMode(modes.SIMPLE_SELECT, { featureIds: [state.polygon.id] });
    }
}

FreehandMode.onTouchEnd = function(state, e) {
    this.onMouseUp(state, e)
}

FreehandMode.fireUpdate = function() {
    this.map.fire(events.UPDATE, {
        action: updateActions.MOVE,
        features: this.getSelected().map(f => f.toGeoJSON())
    });
};

FreehandMode.simplify = function(polygon) {
  const tolerance = 1 / Math.pow(1.05, 10 * this.map.getZoom()) // https://www.desmos.com/calculator/nolp0g6pwr
  simplify(polygon, {
      mutate: true,
      tolerance: tolerance,
      highQuality: true
  });
}

FreehandMode.onStop = function () {
  setTimeout(() => {
    if (!this.map || !this.map.dragPan) return;
    this.map.dragPan.enable();
  }, 0);
};
  
export default FreehandMode
