/**
 * WebSocket server to translate log messages from STB to a desktop console.
 *
 * @author Stanislav Kalashnik <sk@infomir.eu>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var path  = require('path'),
	gulp  = require('gulp'),
	log   = require('../lib/log'),
	ws    = require('ws'),
	title = 'logger  '.inverse.yellow;


gulp.task('logger', function () {
	var config = require(path.join(process.env.CWD, 'config', 'logger')),
		wss;

	if ( config.active ) {
		// WebSocket server creation
		wss = new ws.Server({port: config.port});
		// incoming
		wss.on('connection', function ( socket ) {
			log(title, 'connected');

			socket.on('message', function ( data ) {
				var messages = JSON.parse(data);
				if ( Array.isArray(messages) ) {
					messages.forEach(function ( message ) {
						log(title, message);
					});
				}
			});
		});
		// report
		wss.on('listening', function () {
			log(title, 'listening ...');
		});
	}
});
