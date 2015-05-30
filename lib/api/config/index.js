var configuration = require('nachos-configuration');

var config = configuration.configs.getSync('nachos');
var BASE_URL = 'http://localhost:' + config.port;

var client = require('socket.io-client')(BASE_URL);

// TODO: merge with nachos-configuration.configs, override config's functions with out own

var saveGlobal = function (app, config, callback) {
  configuration.configs.saveGlobal(app, config, function (err) {
    if (err) return callback(err);
    client.emit('config.global-changed', { app: app, config: config });
    callback(null);
  });
};

var saveInstance = function (app, instance, config, callback) {
  configuration.configs.saveInstance(app, instance, config, function (err) {
    if (err) return callback(err);
    client.emit('config.instance-changed', { instance: instance, config: config });
    callback(null);
  });
};

var onGlobalChange = function (app, callback) {
  client.on('config.global-changed:' + app, callback);
};

var onInstanceChange = function (instance, callback) {
  client.on('config.instance-changed:' + instance, callback);
};

module.exports = {
  configs: {
    get: configuration.configs.get,
    getGlobal: configuration.configs.getGlobal,
    saveGlobal: saveGlobal,
    getInstance: configuration.configs.getInstance,
    saveInstance: saveInstance,
    onGlobalChange: onGlobalChange,
    onInstanceChange: onInstanceChange
  },
  dips: configuration.dips
};