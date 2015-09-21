'use strict';
var crispyStream = require('./../lib/index');
var fs = require('fs');
var test = require('tape');
var filename = __dirname + '/assets/test-pic.jpeg';

test('should get new WritableMemoryStream', function(assert) {
  var writable = crispyStream.createWriteStream();
  var expected = 'WritableMemoryStream';
  var actual = writable.constructor.name;
  assert.equal(actual, expected, 'correct instance is returned');

  assert.end();
});

test('should get new ReadableMemoryStream', function(assert) {
  var writable = crispyStream.createReadStream('');
  var expected = 'ReadableMemoryStream';
  var actual = writable.constructor.name;
  assert.equal(actual, expected, 'correct instance is returned');

  assert.end();
});

test('should pipe from ReadableMemoryStream to WritableMemoryStream', function(assert) {
  var expected = 'input to pipe';
  var pipable = crispyStream.createReadStream(expected);
  var writable = crispyStream.createWriteStream();

  writable.on('finish', function() {
    var actual = writable.toString();
    assert.equal(actual, expected, 'properly piped');
    assert.end();
  });
  pipable.pipe(writable);
});

test('should pipe huge data', function(assert) {
  fs.readFile(filename, function(error, buffer) {
    var pipable = crispyStream.createReadStream(buffer);
    var writable = crispyStream.createWriteStream();
    var expected = 181;
    var actual = pipable._source.length;

    assert.equal(actual, expected, 'correct amount of buffers');

    expected = false;
    actual = pipable._source.some(function(buffer) {
      return buffer.length > 4096;
    });

    assert.equal(actual, expected, 'all buffer sizes are correct');

    writable.on('finish', function() {
      expected = buffer.toString('utf-8');
      var actual = writable.toString('utf-8');
      assert.equal(actual, expected, 'content properly piped huge data');

      expected = buffer.toString('utf-8').length;
      actual = writable.toString('utf-8').length;
      assert.equal(actual, expected, 'piped correct amount of bytes');

      assert.end();
    });

    pipable.pipe(writable);
  });
});

test('should pipe from native readable implementation into crispy writable', function(assert) {
  fs.readFile(filename, function(error, buffer) {
    var pipable = fs.createReadStream(filename);
    var writable = crispyStream.createWriteStream();

    writable.on('finish', function() {
      var expected = buffer.toString('utf-8');
      var actual = writable.toString('utf-8');
      assert.equal(actual, expected, 'content properly piped from native stream');

      expected = buffer.toString('utf-8').length;
      actual = writable.toString('utf-8').length;
      assert.equal(actual, expected, 'piped correct amount of bytes from native stream');

      assert.end();
    });

    pipable.pipe(writable);
  });
});

test('should pipe from crispy readable implementation into native writable', function(assert) {
  fs.readFile(filename, function(error, buffer) {
    var pipable = crispyStream.createReadStream(buffer);
    var writable = fs.createWriteStream('/tmp/stream-target.jpeg');

    writable.on('finish', function(data) {
      var data = fs.readFileSync(filename);
      var expected = buffer.toString('utf-8');
      var actual = data.toString('utf-8');
      assert.equal(actual, expected, 'content properly piped from native stream');

      expected = buffer.toString('utf-8').length;
      actual = data.toString('utf-8').length;
      assert.equal(actual, expected, 'piped correct amount of bytes from native stream');

      assert.end();
    });

    pipable.pipe(writable);
  });
});
