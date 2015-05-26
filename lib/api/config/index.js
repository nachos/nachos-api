var configuration = require('nachos-configuration');

var config = configuration.configs.getSync('nachos');
var BASE_URL = 'http://localhost:' + config.port;

var client = require('socket.io-client')(BASE_URL);

var getConfig = function (app, callback) {
  configuration.configs.get(app, callback);
};

var saveConfig = function (app, appConfig, callback) {
  configuration.configs.save(app, appConfig, function (err) {
    if (err) return callback(err);
    client.emit('config-changed', app);
    callback(null);
  });
};

var onChange = function (app, callback) {
  client.on('config-changed:' + app, callback);
};

module.exports = {
  get: getConfig,
  save: saveConfig,
  onChange: onChange,
  dips: configuration.dips
};