'use strict';
var util = require('util');
var errors = require('./errors');
var Writable = require('stream').Writable;
var BadInputError = errors.BadInputError;

function WritableMemoryStream() {
  Writable.call(this);

  this._data = [];
  return this;
}

util.inherits(WritableMemoryStream, Writable);
module.exports = WritableMemoryStream;


WritableMemoryStream.prototype._write = function(buffer, encoding, callback) {
  var error;
  if (typeof buffer === 'string') {
    buffer = new Buffer(buffer, encoding);
  } else if (!(buffer instanceof Buffer)) {
    error = new BadInputError('can only write buffer or string');
    return callback(error);
  }

  this._data.push(buffer);

  setTimeout(callback, 0);
};

WritableMemoryStream.prototype.toString = function(encoding) {
  if (!this._data.length) return '';

  return Buffer.concat(this._data).toString(encoding || 'utf-8');
};
