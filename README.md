# slump

> Create random json.

[![npm](https://img.shields.io/npm/v/slump.svg)](https://www.npmjs.com/package/slump)
![Node version](https://img.shields.io/node/v/slump.svg)
[![Build Status](https://travis-ci.org/ralphtheninja/slump.svg?branch=master)](https://travis-ci.org/ralphtheninja/slump)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Ported from [`node-random-json`](https://github.com/maxtaco/node-random-json).

## Install

```
$ npm install slump --save
```

## Usage

Generate a random json object:

```js
const random = require('slump')
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

#### `random.string([options[, length]])`

Returns a random string in `utf8` encoding.

If `length` is omitted the string length is a random integer between `0` and `100`. So the string can be empty.

Randomizes a much longer string of bytes and cuts it off to appropriate length.

`options` can be used for different encodings:

  * `options.enc` *(string)* Defaults to `utf8`. Valid encodings are `utf8`, `ascii`, `hex`, `base64` and `base58`
  * `options.length` *(number)* Length of string.
  * `options.values` *(array)* Array of predetermined strings.

```js
var random = require('slump')
// random string with random length
var s1 = random.string()
// random string with length 20
var s2 = random.string(20)
// random base58 encoded string with length 30
var s3 = random.string({ enc: 'base58', length: 30 })
// randomize between predetermined values
var values = [ 'apples', 'oranges', 'bananas' ]
var s4 = random.string({ values: values })
```

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
