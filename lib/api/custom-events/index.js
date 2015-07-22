'use strict';

var client = require('../../utils/client');

exports.on = function (name, cb) {
  return client.on('custom.' + name, cb);
};

exports.emit = function (name, data) {
  return client.emit('custom', { name: name, data: data });
};

exports.removeListener = function (name, cb) {
  return client.removeListener('custom.' + name, cb);
};