var client = require('../../utils/client');

exports.on = function (name, cb) {
  client.on('custom.' + name, cb);
};

exports.emit = function (name, data) {
  client.emit('custom', { name: name, data: data });
};

exports.removeListener = function (name, cb) {
  client.removeListener('custom.' + name, cb);
};