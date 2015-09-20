'use strict';
var util = require('util');
var errors = require('./errors');
var Readable = require('stream').Readable;
var BUFFER_SIZE = 4096;
var BadInputError = errors.BadInputError;

function ReadableMemoryStream(input) {
  var chunks;
  var current;
  var start;
  var end;

  Readable.call(this);

  if (typeof input === 'string') {
    input = new Buffer(input);
  }

  if (!(input instanceof Buffer)) {
    throw new BadInputError('input should be a buffer or a string');
  }

  this._source = [];
  chunks = input.length / BUFFER_SIZE;

  for(current = 0; current < chunks; current++) {
    start = current * BUFFER_SIZE;
    end = start + BUFFER_SIZE;
    this._source.push(input.slice(start, end));
  }
  return this;
}

util.inherits(ReadableMemoryStream, Readable);
module.exports = ReadableMemoryStream;

ReadableMemoryStream.prototype._read = function() {
  var chunk;
  if (!this._source.length) return this.push(null);
  chunk = this._source.shift();
  this.push(chunk);
};
