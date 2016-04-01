/*!
 * media-mime-detect <https://github.com/warau-js/media-mime-detect>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */

'use strict'

var magic = require('stream-mmmagic')
var path = require('path')

var magicAdditions = path.join(__dirname, 'misc', 'magic')
var defaultMagic = null
try {
  defaultMagic = require.resolve('stream-mmmagic/node_modules/mmmagic/magic/magic.mgc')
} catch (e) {
  /* istanbul ignore else  */
  if (e.code === 'MODULE_NOT_FOUND') {
    // npm-version >= 3
    defaultMagic = require.resolve('mmmagic/magic/magic.mgc')
  } else {
    // else-block ignored in test coverage report. It exist to be save, in case
    // the `require.resolve` throws an error other tham MODULE_NOT_FOUND.
    throw e
  }
}
magic.config.magicFile = magicAdditions + ':' + defaultMagic

module.exports = magic
