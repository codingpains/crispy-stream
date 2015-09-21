'use strict';
var Readable = require('./readable');
var Writable = require('./writable');

module.exports = exports = {};

exports.Readable = Readable;
exports.Writable = Writable;
exports.createWriteStream = function() {
  return new Writable();
};
exports.createReadStream = function(input) {
  return new Readable(input);
};
