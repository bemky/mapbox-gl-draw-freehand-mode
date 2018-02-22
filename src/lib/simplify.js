const { Point } = require('leaflet');
const { Clipper, PolyFillType } = require('clipper-lib');

/**
 * @method clipperPolygonsToLatLngs
 * @param {Array} polygons
 * @return {Array}
 */
const clipperPolygonsToLatLngs = (polygons) => {

    return polygons.map(polygon => {

        return polygon.map(point => {
            return new Point(point.X, point.Y);
        });

    });

};

/**
 * @param [{"X": 11, "Y": 11}...] coordinates
 * @param {Object} options
 * @return {LatLng[]}
 */
module.exports = {
    points(coordinates, options) {
        options = options || {
            simplifyFactor: 0.8
        }
        const points = Clipper.CleanPolygon(coordinates, options.simplifyFactor);
        const polygons = Clipper.SimplifyPolygon(points, PolyFillType.pftNonZero);

        return clipperPolygonsToLatLngs(polygons);
    }
}