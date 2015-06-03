var tailor = require('api-tailor');
var configuration = require('nachos-configuration');

var config = configuration.settings('nachos').getSync();
console.log(config);
var host = 'http://localhost:' + config.port;

module.exports = tailor({
  host: host,
  resources: {
    fs: require('./fs'),
    user: require('./user')
  }
});
