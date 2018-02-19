var FreeDrawMode = module.exports = {};

FreeDrawMode.onSetup = function() {
  this.setActionableState();
  return {};
};

FreeDrawMode.toDisplayFeatures = function(state, geojson, display) {
  display(geojson);
};