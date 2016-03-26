var fs = require('fs');
var path = require('path');
var sharp = require('sharp');
var minimatch = require('minimatch');
var debug = require('debug')('metalsmith-image-resizer');
var async = require('async');


module.exports = function(args) {
	return function(files, metalsmith, done) {
		if (!args.src) {
			new Error('metalsmith-image-resizer: "src" arg is required')
		}
		async.map(Object.keys(files), function(fileName, cb) {
			debug(fileName)
			resizeFile(fileName, args, files, results, cb)
		}, function(err) {
			return done(err)
		})
	}
}
var resizeFile = function(fileName, args, files, results, cb) {
	if (minimatch(fileName, args.src)) {
		newName = path.join(path.dirname(fileName), path.basename(fileName, path.extname(fileName)) + "_resized" + path.extname(fileName))
		sharp(files[fileName].contents).resize(100, 100).toBuffer(function(err, buffer) {
			files[newName] = {
				contents: buffer
			}
			cb()
		})
	} else {
		cb()
	}
}
