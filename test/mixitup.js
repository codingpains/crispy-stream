'use strict';
var crispyStream = require('./../lib/index');
var fs = require('fs');
var test = require('tape');
var filename = __dirname + '/assets/test-pic.jpeg';

test('should get new WritableMemoryStream', function(assert) {
  var writable = crispyStream.createWritableStream();
  var expected = 'WritableMemoryStream';
  var actual = writable.constructor.name;
  assert.equal(actual, expected, 'correct instance is returned');

  assert.end();
});

test('should get new ReadableMemoryStream', function(assert) {
  var writable = crispyStream.createReadableStream('');
  var expected = 'ReadableMemoryStream';
  var actual = writable.constructor.name;
  assert.equal(actual, expected, 'correct instance is returned');

  assert.end();
});

test('should pipe from ReadableMemoryStream to WritableMemoryStream', function(assert) {
  var expected = 'input to pipe';
  var pipable = crispyStream.createReadableStream(expected);
  var writable = crispyStream.createWritableStream();

  writable.on('finish', function() {
    var actual = writable.toString();
    assert.equal(actual, expected, 'properly piped');
    assert.end();
  });
  pipable.pipe(writable);
});

test('should pipe huge data', function(assert) {
  fs.readFile(filename, function(error, buffer) {
    var pipable = crispyStream.createReadableStream(buffer);
    var writable = crispyStream.createWritableStream();
    var expected = buffer.toString('utf-8');

    writable.on('finish', function() {
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
