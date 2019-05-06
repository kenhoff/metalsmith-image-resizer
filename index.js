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
		if (!args.width && !args.height && !args.sizes) {
			return done(new Error('metalsmith-image-resizer: "width" or "height" arg is required'))
		}
		async.map(Object.keys(files), function(fileName, cb) {
			if (args.sizes) {
				async.each(args.sizes, (size, cb) => {
					resizeFile(fileName, {
						...args,
						...size
					}, files, cb)
				}, cb)
			} else {
				resizeFile(fileName, args, files, cb)
			}
		}, function(err) {
			return done(err)
		})
	}
}
var resizeFile = function(fileName, args, files, cb) {
	if (minimatch(fileName, args.glob)) {
		if (!args.fake) {
			var resizedFile = sharp(files[fileName].contents).resize({
				width: args.width,
				height: args.height
			})
		}
		var size = args.width || '';
		if (size && args.height) {
			size += 'x';
		}
		if (args.height) {
			size += args.height;
		}
		if (args.ext) {
			resizedFile.toFormat(args.ext)
			// change extension on file written
			fileNameSplit = fileName.split(".")
			newFileName = [fileNameSplit.slice(0, fileNameSplit.length - 1).join(), args.ext].join(".")
			files[newFileName] = files[fileName]
			delete files[fileName]
			fileName = newFileName
		}
		if (args.includeSize) {
			fileNameSplit = fileName.split(".")
			newFileName = [fileNameSplit.slice(0, fileNameSplit.length - 1).join(), size, fileNameSplit.pop()].join(".")
			files[newFileName] = files[fileName]
			// delete files[fileName]
			fileName = newFileName
		}
		if (args.fake) {
			cb();
		} else {
			resizedFile.toBuffer(function(err, buffer) {
				files[fileName] = {
					contents: buffer
				}
				cb(err)
			})
		}

	} else {
		cb(null)
	}
}
