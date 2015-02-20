var test = require('tape')
var random = require('../')
var util = require('core-util-is')

test('random integers', function (t) {
  t.plan(2000)
  for (var i = 0; i < 1000; ++i) {
    var integer = random.integer()
    t.ok(util.isNumber(integer))
    t.ok(integer >= 0)
  }
})

test('random signed integers', function (t) {
  t.plan(2000)
  for (var i = 0; i < 1000; ++i) {
    var integer = random.integer(true)
    t.ok(util.isNumber(integer))
    t.ok(integer >= 0 || integer < 0)
  }
})

test('random floats', function (t) {
  t.plan(2000)
  for (var i = 0; i < 1000; ++i) {
    var float = random.float()
    t.ok(util.isNumber(float))
    t.ok(float >= 0 || float < 0)
  }
})

test('random strings with random length', function (t) {
  t.plan(2000)
  for (var i = 0; i < 1000; ++i) {
    var string = random.string()
    t.ok(util.isString(string))
    t.ok(string.length <= 100)
  }
})

test('random strings fixed length, base64', function (t) {
  t.plan(2000)
  var length = 20
  for (var i = 0; i < 1000; ++i) {
    var string = random.string(length)
    t.ok(util.isString(string))
    t.equal(string.length, length)
  }
})

test('random arrays with random length', function (t) {
  t.plan(2000)
  for (var i = 0; i < 1000; ++i) {
    var array = random.array()
    t.ok(util.isArray(array))
    t.ok(array.length <= 10)
  }
})

test('random arrays with fixed length', function (t) {
  var length = 5
  t.plan((length + 2) * 500)
  for (var i = 0; i < 500; ++i) {
    var array = random.array(length)
    t.ok(util.isArray(array))
    t.equal(array.length, length)
    array.forEach(function (i) {
      t.ok(validJSON(i))
    })
  }
})

test('random obj with random number of keys', function (t) {
  t.plan(2000)
  for (var i = 0; i < 1000; ++i) {
    var obj = random.obj()
    t.ok(util.isObject(obj))
    t.ok(Object.keys(obj).length <= 10)
  }
})

test('random obj with fixed number of keys', function (t) {
  var size = 5
  t.plan((3 * size + 2) * 500)
  for (var i = 0; i < 500; ++i) {
    var obj = random.obj(size)
    t.ok(util.isObject(obj))
    t.equal(Object.keys(obj).length, size)
    Object.keys(obj).forEach(function (key) {
      t.ok(util.isString(key))
      t.ok(key.length >= 1 && key.length <= 10)
      t.ok(validJSON(obj[key]))
    })
  }
})

test('random json values', function (t) {
  t.plan(2000)
  for (var i = 0; i < 2000; ++i) {
    t.ok(validJSON(random.json()))
  }
})

function validJSON(json) {
  try {
    JSON.parse(JSON.stringify(json))
    return true
  } catch (e) {
    return false
  }
}
