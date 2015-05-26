var tailor = require('api-tailor');
var configuration = require('nachos-configuration');

var config = configuration.configs.getSync('nachos');
var host = 'http://localhost:' + config.port + '/api';

module.exports = tailor({
  host: host,
  resources: {
    fs: require('./fs'),
    user: require('./user')
  }
});
