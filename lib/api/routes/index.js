var tailor = require('api-tailor');
var SettingsFile = require('nachos-settings-file');

var config = require('nachos-config')().getSync();
var host = 'http://localhost:' + config.port + '/api';

module.exports = tailor({
  host: host,
  resources: {
    fs: require('./fs'),
    user: require('./user')
  }
});
