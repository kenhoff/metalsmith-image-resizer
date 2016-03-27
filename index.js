var fs = require('fs');
var path = require('path');
var sharp = require('sharp');
var minimatch = require('minimatch');
var debug = require('debug')('metalsmith-image-resizer');
var async = require('async');


module.exports = function(args) {
	return function(files, metalsmith, done) {
		if (!args.glob) {
			return done(new Error('metalsmith-image-resizer: "glob" arg is required'))
		}
		if (!args.width) {
			return done(new Error('metalsmith-image-resizer: "width" arg is required'))
		}
		if (!args.height) {
			return done(new Error('metalsmith-image-resizer: "height" arg is required'))
		}
		async.map(Object.keys(files), function(fileName, cb) {
			resizeFile(fileName, args, files, cb)
		}, function(err) {
			return done(err)
		})
	}
}
var resizeFile = function(fileName, args, files, cb) {
	if (minimatch(fileName, args.glob)) {
		sharp(files[fileName].contents).resize(args.width, args.height).toBuffer(function(err, buffer) {
			files[fileName] = {
				contents: buffer
			}
			cb(err)
		})
	} else {
		cb(null)
	}
}
