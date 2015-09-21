# Crispy Stream
[![Build Status](https://travis-ci.org/codingpains/crispy-stream.svg?branch=master)](https://travis-ci.org/codingpains/crispy-stream)
[![Code Climate](https://codeclimate.com/github/codingpains/crispy-stream/badges/gpa.svg)](https://codeclimate.com/github/codingpains/crispy-stream)
[![Test Coverage](https://codeclimate.com/github/codingpains/crispy-stream/badges/coverage.svg)](https://codeclimate.com/github/codingpains/crispy-stream/coverage)

Lets imagine you want to test how a lib you created behaves when using its 'stream-mode' and, of course you don't want to read and write from file system. So what should you do? Well you should use this package which is an implementation of [Stream](https://nodejs.org/api/stream.html#stream_api_for_stream_implementors).

Because this library implements [Node's Stream abstract interface](https://nodejs.org/api/stream.html) you can use it
as you would any other Stream implementation.

## Installation

```
 $ npm install crispy-stream
```

## Require Crispy Stream

```js
  var crispyStream = require('crispy-stream');
```

## Read Stream.

### Creating Read Stream Using a Factory.

If you prefer to have functions creating your streams rather than using the new operator yourself.

```js
  // With buffer input.
  var buff = new Buffer('sample text');
  var readable = crispyStream.createReadStream(buff);

  // With simple string.
  var readable = crispyStream.createReadStream('sample text');
```

### Creating New Read Stream Using The new Operator.

In case you fancy the Pseudo-classical way.

```js
  var Readable = crispyStream.Readable;

  // With buffer input.
  var buff = new Buffer('sample text');
  var readable = new Readable(buff);

  // With simple string.
  var readable = new Readable('sample text');
```

## Write Stream.

### Creating Write Stream Using a Factory.

```js
  var writable = crispyStream.createWriteStream();
```

### Creating Write Stream Using The new Operator.

```js
  var Writable = crispyStream.Writable;
  var writable = new Writable();
```


## Piping.

Just as every stream library, you can pipe things from a read stream to a write stream.

### Between Crispy Streams.

```js
  var input = 'pipe this';
  var pipable = crispyStream.createReadStream(input);
  var writable = crispyStream.createWriteStream();

  pipable.pipe(writable);
```

### Between Crispy Stream and Native Stream.

**Native Readable to Crispy Writable**

```js
  var fs = require('fs');
  var input = '/path/to/input';
  var pipable = fs.createReadStream(input);
  var writable = crispyStream.createWriteStream();

  pipable.pipe(writable);
```
**Crispy Readable to Native Writable**

```js
  var fs = require('fs');
  var input = 'pipe this';
  var filename = '/path/to/output';
  var pipable = crispyStream.createReadStream(input);
  var writable = fs.createWriteStream(filename);

  pipable.pipe(writable);
```
