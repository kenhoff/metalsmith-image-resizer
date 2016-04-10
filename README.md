# metalsmith-image-resizer
An image resizing plugin for [Metalsmith](http://www.metalsmith.io/). Not dependent on imagemagick/graphicsmagick!

## Installation

```
npm install metalsmith-image-resizer --save
```

### Dependencies

`metalsmith-image-resizer` depends on [`sharp`](http://sharp.dimens.io/). If you're on Mac OS X, you'll need to install libvips (`brew install homebrew/science/vips`). If you're on Linux or Windows, no other dependency should be needed.

## Usage

### API

```
var Metalsmith = require('metalsmith');
var imageResizer = require('metalsmith-image-resizer');

Metalsmith(__dirname)
	.source(__dirname + "/src")
	.destination(__dirname + "/build")
	.use(imageResizer({
		glob: "img/backgrounds/*",
		width: 1920,
		height: 1080
	}))
	.build(function(err) {
		if (err) throw err;
	})
```

You can use `imageResizer` multiple times to resize different globs of images with different options:

```
Metalsmith(__dirname)
	.source(__dirname + "/src")
	.destination(__dirname + "/build")
	.use(imageResizer({
		glob: "img/backgrounds/*",
		width: 1920,
		height: 1080
	}))
	.use(imageResizer({
		glob: "img/people/*",
		width: 200,
		height: 200
	}))
	.build(function(err) {
		if (err) throw err;
	})
```

## Credits

Modeled after [@tomterl](https://github.com/tomterl)'s [metalsmith-convert](https://github.com/tomterl/metalsmith-convert) plugin.

This is my (@kenhoff's) first time maintaining an OSS project! Tips, suggestions, issues, and pull requests are all totally appreciated.
