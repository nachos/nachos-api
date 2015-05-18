var router = require('route-mapper');

var getBaseUrl = function(){
  var configuration = require('nachos-configuration');
  configuration.configs.get('nachos', function(err, config) {
    if (err)
      console.log(err);
    return 'http://localhost:' + config.port + '/api';
  });
};

var BASE_URL = getBaseUrl();

module.exports.fs = router(BASE_URL, '/fs', require('./fs'));
module.exports.user = router(BASE_URL, '/user', require('./user'));