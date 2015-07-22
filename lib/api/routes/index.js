'use strict';

var tailor = require('api-tailor');

var config = require('nachos-config')().getSync();
var host = 'http://localhost:' + config.port + '/api';

module.exports = tailor({
  host: host,
  resources: {
    system: require('./system')
  }
});
