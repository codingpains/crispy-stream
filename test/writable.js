'use strict';
var test = require('tape');
var Writable = require('./../lib/writable');

function createWritableStream() {
  return new Writable();
}

test('Writable - create: should create instance of WritableMemoryStream', function(assert) {
  var expected = 'WritableMemoryStream';
  var actual = createWritableStream().constructor.name;

  assert.equal(actual, expected, 'class is correct');
  assert.end();
});

test('Writable - create: should start with empty array', function(assert) {
  var writable = createWritableStream();

  var expected = true;
  var actual = writable._data instanceof Array;
  assert.equal(actual, expected, 'data is an array');

  expected = 0;
  actual = writable._data.length;
  assert.equal(actual, expected, 'data is empty array');

  assert.end();
});

test('Writable - write: should append buffers to data array', function(assert) {
  var writable = createWritableStream();
  var enc = 'utf-8';

  writable.write('oenyi!', enc, function() {
    writable.write('oenyi!', enc, function() {
      var expected = 2;
      var actual = writable._data.length;
      assert.equal(expected, actual, 'data length is correct');

      expected = true;
      actual = (writable._data[0] instanceof Buffer) &&
        (writable._data[1] instanceof Buffer);
      assert.equal(expected, actual, 'data types are correct');

      expected = 'oenyi!oenyi!';
      actual = writable.toString();
      assert.equal(actual, expected, 'data content is correct');

      assert.end();
    });
  });
});

test('Writable - write: should only write buffers and strings', function(assert) {
  var writable = createWritableStream();
  var enc = 'utf-8';
  var expected;
  var actual;

  writable._write(123, enc, function(error) {
    error = error || {name: 'nope'};

    expected = 'BAD_INPUT';
    actual = error.name;
    assert.equal(actual, expected, 'correct error is returned');

    writable._write('string', enc, function(error) {
      expected = false;
      actual = !!error;
      assert.equal(actual, expected, 'string is allowed');

      writable._write(new Buffer('buffer'), enc, function(error) {
        actual = !!error;
        assert.equal(actual, expected, 'buffer is allowed');
        assert.end();
      });
    });
  });
});

test('Writable - toString: should return empty string when empty', function(assert) {
  var writable = createWritableStream();
  var expected = '';
  var actual = writable.toString();

  assert.equal(actual, expected, 'correct return value of toString');
  assert.end();
});

test('Writable - toString: should apply encoding', function(assert) {
  var writable = createWritableStream();
  var input = 'special characters ñ@®©ú';
  writable.write(input, 'utf-8', function(error) {
    if (error) {
      assert.fail('unexpected error');
      return assert.end();
    }
    var expected = 'special characters C1@B.B)C:';
    var actual = writable.toString('ascii');
    assert.equal(actual, expected, 'ascii enconding applied');

    expected = input;
    actual = writable.toString();
    assert.equal(actual, expected, 'default utf-8 enconding applied');

    expected = input;
    actual = writable.toString('utf-8');
    assert.equal(actual, expected, 'utf-8 enconding applied');

    assert.end();
  });
});
