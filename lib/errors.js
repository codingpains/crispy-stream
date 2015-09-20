var util = require('util');

module.exports = exports = {};

function BadInputError(message) {
  'use strict';
  this.name = 'BAD_INPUT';
  this.message = message;
  Error.captureStackTrace(this, BadInputError);
}

util.inherits(BadInputError, Error);
exports.BadInputError = BadInputError;
