'use strict';

var nachosConfig = require('nachos-config');
var server = require('nachos-server-api');
var Q = require('q');

var config = nachosConfig.getSync();
var client = server();

if (config.token) {
  client.connect({ token: config.token });
}

module.exports.server = client;
