var crypto = require('crypto')
var util   = require('core-util-is')
var bs58   = require('bs58')

function randomBytes (size) {
  return crypto.randomBytes(size || 1)
}

function byte () {
  return randomBytes(1)[0]
}

function integer (signed) {
  var bytes = randomBytes(4)
  var result = 0
  for (var i = 0; i < 4; ++i) {
    result *= 256
    result += bytes[i]
  }
  if (signed && bytes[3] >= 128) return 0 - result
  return result
}

function float () {
  var n = integer(true)
  var d = integer() || 1
  return n / d
}

function string (opts, length) {
  var enc = 'utf8'

  if (util.isNumber(opts)) {
    length = opts
  }
  else if (util.isObject(opts)) {
    length = length || opts.length
    enc = opts.enc || enc

    if (util.isArray(opts.values) && opts.values.length > 0) {
      var i = integer() % opts.values.length
      return opts.values[i]
    }
  }

  if (!length) length = integer() % 101
  if (!length) return ''

  var bytes = randomBytes(length * 10)
  return encode(bytes, enc).substr(0, length)
}

function array (length, depth) {
  depth = depth || 0
  if (!length) length = integer() % 11
  var result = []
  for (var i = 0; i < length; ++i) {
    result[i] = json(depth + 1)
  }
  return result
}

function obj (size, depth) {
  depth = depth || 0
  if (!size) size = integer() % 11
  var result = {}

  for (var i = 0; i < size; ++i) {
    var key = generateUniqueKey()
    var value = json(depth + 1)
    result[key] = value
  }

  function generateUniqueKey () {
    var length, key
    do {
      length = 1 + integer() % 10
      key = string(length)
    } while (result[key] !== undefined)
    return key
  }

  return result
}

function json (depth) {
  depth = depth || 0
  var type = byte() % 8

  // if we are too deep don't generate more depth
  if (depth > 4 && type > 5) type %= 5

  if (type == 0) return false
  if (type == 1) return true
  if (type == 2) return null
  if (type == 3) return integer(true)
  if (type == 4) return float()
  if (type == 5) return string()
  if (type == 6) return array(null, depth)
  if (type == 7) return obj(null, depth)
}

function encode (bytes, enc) {
  if (enc === 'base58') {
    return bs58.encode(bytes)
  }
  return bytes.toString(enc)
}

exports.bytes = randomBytes
exports.byte = byte
exports.integer = integer
exports.float = float
exports.string = string
exports.array = array
exports.obj = obj
exports.json = json
