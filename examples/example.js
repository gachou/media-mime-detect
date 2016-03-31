var fs = require('fs')
var detect = require('../')

detect(fs.createReadStream('prinz-georg-garten.jpg'), function (err, mime, stream) {
  if (err) throw err
  console.log(mime)
  // Here is the place to decide what should happen with the stream
  // based on its mime-type
  stream.pipe(fs.createWriteStream('prinz-georg-garten2.jpg'))
})
