import terser from '@rollup/plugin-terser';

export default {
	input: 'src/index.js',
	output: {
		name: 'FreehandMode',
		format: 'iife',
		file: 'dist/mapbox-gl-draw-freehand-mode.js',
		globals: {
        	'@mapbox/mapbox-gl-draw/src/modes/draw_polygon': 'MapboxDraw.modes.draw_polygon',
        	'@mapbox/mapbox-gl-draw/src/constants': 'MapboxDraw.constants',
        	'@turf/simplify': 'turf.simplify',
		},
		plugins: [
			terser()
		],
	},
	external: [
		'@mapbox/mapbox-gl-draw/src/modes/draw_polygon',
		'@mapbox/mapbox-gl-draw/src/constants',
		'@turf/simplify'
	]
};
