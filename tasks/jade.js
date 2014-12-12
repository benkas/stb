/**
 * Compile HTML files from Jade sources.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 */

'use strict';

var gulp    = require('gulp'),
	jade    = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	project = require('../package.json');


gulp.task('jade:develop', function () {
	return gulp
		.src('./app/jade/main.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: true,
			locals: {
				develop: true,
				title  : 'develop :: ' + project.name,
				version: project.version
			}
		}))
		.pipe(gulp.dest('./build/develop/'));
});


gulp.task('jade:release', function () {
	return gulp
		.src('./app/jade/main.jade')
		.pipe(plumber())
		.pipe(jade({
			pretty: false,
			locals: {
				develop: false,
				title  : 'release :: ' + project.name,
				version: project.version
			}
		}))
		.pipe(gulp.dest('./build/release/'));
});


gulp.task('jade', ['jade:develop', 'jade:release']);
