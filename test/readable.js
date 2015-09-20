'use strict';
var test = require('tape');
var Readable = require('./../lib/readable');

function createReadableStream(input) {
  return new Readable(input);
}

test('create: should throw if input is not a string or buffer', function(assert) {
  var expected = 'BAD_INPUT';
  var actual;

  try {
    createReadableStream(19982938);
  } catch(error) {
    actual = error.name;
  }

  assert.equal(actual, expected);
  assert.end();
});

test('create: should not throw when input is string', function(assert) {
  try {
    createReadableStream('input string');
  } catch(error) {
    assert.fail('unexpected error');
    return assert.end();
  }

  assert.pass('success creating stream');
  assert.end();
});

test('create: should not throw when input is buffer', function(assert) {
  try {
    createReadableStream(new Buffer('input string'));
  } catch(error) {
    assert.fail('unexpected error');
    return assert.end();
  }

  assert.pass('success creating stream');
  assert.end();
});

test('read: should read when input is string', function(assert) {
  var expected = 'oenyi! oenyi! oenyi!...';
  var actual = '';

  createReadableStream(expected)
    .on('data', function(data) {
      actual += data;
    })
    .on('end', function() {
      assert.equal(actual, expected, 'read data is correct');
      assert.end();
    });
});

test('read: should read when input is buffer', function(assert) {
  var expected = 'oenyi! oenyi! oenyi!...';
  var actual = '';

  createReadableStream(new Buffer(expected))
    .on('data', function(data) {
      actual += data;
    })
    .on('end', function() {
      console.log(actual, expected);
      assert.equal(actual, expected, 'read data is correct');
      assert.end();
    });
});
