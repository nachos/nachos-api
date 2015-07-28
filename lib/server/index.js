'use strict';

var nachosConfig = require('nachos-config');
var server = require('nachos-server-api');
var debug = require('debug')('nachosApi:server');

var config = nachosConfig.getSync();
var client = server();

if (config.token) {
  debug('token in config: %s', config.token);
  client.setToken(config.token);
}

module.exports = {
  server: client
};
