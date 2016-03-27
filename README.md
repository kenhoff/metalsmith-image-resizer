# metalsmith-image-resizer
A non-imagemagick/graphicsmagick-dependent image resizing plugin for [Metalsmith](http://www.metalsmith.io/).

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
		src: "img/*" // glob for the images you'd like to resize
	}))
	.build(function(err) {
		if (err) throw err;
	})
```


## Options

--------------------------------------------------------------------------------

Modeled after [@tomterl](https://github.com/tomterl)'s [metalsmith-convert](https://github.com/tomterl/metalsmith-convert) plugin.
