'use strict';

var config = require('nachos-config').getSync();
var BASE_URL = 'http://localhost:' + config.port;

var client = require('socket.io-client')(BASE_URL);

module.exports = client;