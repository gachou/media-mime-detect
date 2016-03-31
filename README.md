# media-mime-detect 

[![NPM version](https://badge.fury.io/js/media-mime-detect.svg)](http://badge.fury.io/js/media-mime-detect)
     [![Travis Build Status](https://travis-ci.org/warau-js/media-mime-detect.svg?branch=master)](https://travis-ci.org/warau-js/media-mime-detect)
   [![Coverage Status](https://img.shields.io/coveralls/warau-js/media-mime-detect.svg)](https://coveralls.io/r/warau-js/media-mime-detect)


> streaming detection of media-files in Node.js


This package uses [undefined](https://npmjs.com/package/undefined) to sniff for magic-bytes on a stream without interupting the
stream. In fact, this package uses `stream-mmmagic` directly with a single change:

It ships with a custom `magic`-file that contains patterns for mime-types that are not detected
by the current default `magic`-file.

## Additional file-types

* `video/m2pt`: MPEG2-Transport-Stream (used by cameras that record AVHCD-videos)



# Installation

```
npm install media-mime-detect
```

 
## Usage

The following example demonstrates how to use this module:

```js
var fs = require('fs')
var detect = require('media-mime-detect')

detect(fs.createReadStream('prinz-georg-garten.jpg'), function (err, mime, stream) {
  console.log(mime)
  // Here is the place to decide what should happen with the stream
  // based on its mime-type
  stream.pipe(fs.createWriteStream('prinz-georg-garten2.jpg'))
})
```

This will generate the following output

```
{ type: 'image/jpeg', encoding: 'binary' }
```

##  API-reference




## License

`media-mime-detect` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).