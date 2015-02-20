var crypto = require('crypto')

exports.bytes = function (size) {
  return crypto.randomBytes(size || 1)
}

exports.byte = function () {
  return exports.bytes(1)[0]
}

exports.integer = function (signed) {
  var bytes = exports.bytes(4)
  var result = 0
  for (var i = 0; i < 4; ++i) {
    result *= 256
    result += bytes[i]
  }
  if (signed && bytes[3] >= 128) return 0 - result
  return result
}

exports.float = function () {
  var n = exports.integer(true)
  var d = exports.integer() || 1
  return n / d
}

exports.string = function (length) {
  if (!length) length = exports.integer() % 101
  if (!length) return ''
  // TODO allow for different kinds of encodings
  var res = exports.bytes(length).toString('base64')
  if (res.length > length) {
    res = res.substr(0, length)
  }
  return res
}

exports.array = function (length, depth) {
  depth = depth || 0
  if (!length) length = exports.integer() % 11
  var result = []
  for (var i = 0; i < length; ++i) {
    result[i] = exports.json(depth + 1)
  }
  return result
}

exports.obj = function (size, depth) {
  depth = depth || 0
  if (!size) size = exports.integer() % 11
  var result = {}

  for (var i = 0; i < size; ++i) {
    var key = generateUniqueKey()
    var value = exports.json(depth + 1)
    result[key] = value
  }

  function generateUniqueKey() {
    var length, key
    do {
      length = 1 + exports.integer() % 10
      key = exports.string(length)
    } while (result[key] !== undefined)
    return key
  }

  return result
}

exports.json = function (depth) {
  depth = depth || 0
  var type = exports.byte() % 8

  // if we are too deep don't generate more depth
  if (depth > 4 && type > 5) type %= 5

  if (type == 0) return false
  if (type == 1) return true
  if (type == 2) return null
  if (type == 3) return exports.integer(true)
  if (type == 4) return exports.float()
  if (type == 5) return exports.string()
  if (type == 6) return exports.array(null, depth)
  if (type == 7) return exports.obj(null, depth)
}
