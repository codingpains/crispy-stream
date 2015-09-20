'use strict';
var Readable = require('./readable');
var Writable = require('./writable');

module.exports = exports = {};

exports.Readable = Readable;
exports.Writable = Writable;
exports.createWritableStream = function() {
  return new Writable();
};
exports.createReadableStream = function(input) {
  return new Readable(input);
};
