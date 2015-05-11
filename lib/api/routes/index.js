var router = require('route-mapper');

// TODO: change this line
var BASE_URL = 'http://localhost:9000/api';

module.exports.fs = router(BASE_URL, '/fs', require('./fs'));
module.exports.user = router(BASE_URL, '/user', require('./user'));