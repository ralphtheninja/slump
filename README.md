# slump [![Build Status](https://travis-ci.org/ralphtheninja/slump.svg?branch=master)](https://travis-ci.org/ralphtheninja/slump)

Create random json.

Ported from [`node-random-json`](https://github.com/maxtaco/node-random-json).

## Install

```
$ npm install slump --save
```

## Usage

Generate a random json object:

```js
var random = require('slump')
console.log(JSON.stringify(random.json(), null, 2))
```

```json
[
  [
    null,
    0.7102621181796653,
    []
  ]
]
```

## Api

#### `random.bytes([size])`

Returns a buffer of random bytes of size `size`, which defaults to one.

#### `random.byte()`

Returns a single random byte.

#### `random.integer([signed])`

Returns a 32 bit integer. If `signed` is trueish both negative and positive values are generated. Default is non signed integers.

#### `random.float()`

Returns a float as a result of division of two random integers. Random floats are always signed.

#### `random.string([length])`

Returns a random string in `base64` format.

If `length` is omitted the string length is a random integer between `0` and `100`. So the string can be empty.

#### `random.array([length])`

Returns a fixed `length` random array where the elements are random json values, i.e. the elements can be anything from null, false, true, another json object etc.

If `length` is omitted the string length is a random integer between `0` and `10`. So the array can be empty.

#### `random.obj([size])`

Returns a random object with `size` number of random keys and values. Each property is a `random.string()` (with random length) and each value is a `random.json()`.

If `size` is omitted the number of properties is a random integer between `0` and `10`. So the object can be empty.

#### `random.json()`

Generates a random `json` object value, i.e. either of the following:

* `false`
* `true`
* `null`
* `random.integer()`
* `random.float()`
* `random.string()`
* `random.array()`
* `random.obj()`

## Todo

* Configuration for changing default behaviors and also per single operations, i.e. default lengths of strings etc.
* More advanced schemas. It could be useful to generate random data that still follows a defined structure, perhaps you want arrays of only strings, number intervals and things like that.

## License
All code, unless stated otherwise, is licensed under the [`WTFPL`](http://www.wtfpl.net/txt/copying/).
