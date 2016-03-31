/*!                                                                               n
 * media-mime-detect <https://github.com/warau-js/media-mime-detect>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

/* global describe */
/* global it */
// /* global xdescribe */
// /* global xit */
/* global beforeEach */
/* global afterEach */

'use strict'

var detect = require('../')
var qfs = require('q-io/fs')
var fs = require('fs')
var Q = require('q')
var loadData = Q.denodeify(require('video-testdata-loader'))
var path = require('path')
var tempfile = require('tempfile')('.tests')

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
chai.should()

function getMimeType (file) {
  var defer = Q.defer()
  var stream = fs.createReadStream(file)
  detect(stream, function (err, mime, output) {
    if (err) {
      throw err
    }
    var targetFile = path.resolve(tempfile, path.basename(file))
    output.pipe(fs.createWriteStream(targetFile))
      .on('finish', function () {
        // ensure that the stream does not modify the contents
        fs.readFileSync(targetFile).should.deep.equal(fs.readFileSync(file))
        defer.resolve(mime.type)
      })
  })
  return defer.promise
}

describe('media-mime-detect:', function () {
  beforeEach(() => qfs.makeTree(tempfile))
  afterEach(() => qfs.removeTree(tempfile))

  it('should detect video/mp4 from streamable video', function () {
    return loadData('1-video-streamable.mp4').then(getMimeType).should.eventually.equal('video/mp4')
  })

  it('should detect video/mp4 from unstreamable video', function () {
    return loadData('2-video-unstreamable.mp4').then(getMimeType).should.eventually.equal('video/mp4')
  })

  it('should detect video/mp2t', function () {
    return loadData('panasonic-lumix-dmc-zx3.tar', 'PRIVATE/AVCHD/BDMV/STREAM/00000.MTS')
      .then(getMimeType).should.eventually.equal('video/mp2t')
  })

  it('should detect animated gifs', function () {
    return getMimeType(require.resolve('./fixtures/animated-gif.gif'))
      .should.eventually.equal('image/gif')
  })
})
