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
		var resizedFile = sharp(files[fileName].contents).resize(args.width, args.height)
		if (args.ext) {
			resizedFile.toFormat(args.ext)
				// change extension on file written

			fileNameSplit = fileName.split(".")
			newFileName = [fileNameSplit.slice(0, fileNameSplit.length - 1).join(), args.ext].join(".")
			files[newFileName] = files[fileName]
			delete files[fileName]
			fileName = newFileName
		}
		resizedFile.toBuffer(function(err, buffer) {
			files[fileName] = {
				contents: buffer
			}
			cb(err)
		})

	} else {
		cb(null)
	}
}
