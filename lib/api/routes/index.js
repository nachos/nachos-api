var router = require('route-mapper');
var configuration = require('nachos-configuration');

var config = configuration.configs.getSync('nachos');
var BASE_URL = 'http://localhost:' + config.port + '/api';
console.log('base url: ' + BASE_URL);

module.exports.fs = router(BASE_URL, '/fs', require('./fs'));
module.exports.user = router(BASE_URL, '/user', require('./user'));