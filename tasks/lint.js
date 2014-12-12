/**
 * Analyse JavaScript code for potential errors and problems.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var gulp    = require('gulp'),
	plumber = require('gulp-plumber'),
	jshint  = require('gulp-jshint');


gulp.task('lint', function () {
	return gulp
		.src('./app/js/**/*.js')
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});
