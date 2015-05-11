var configuration = require('nachos-configuration');
var fs = require('./fs');
var user = require('./user');
  //var client = require('./client');

var getConfig = function (app, callback) {
  configuration.configs.get(app, callback);
};

var saveConfig = function (app, appConfig, callback) {
  configuration.configs.save(app, appConfig, function (err) {
    if (err) return callback(err);
    //client.socket.emit('appdata', appConfig);
    callback(null);
  });
};

/*var close = function () {
  client.socket.disconnect();
};*/

module.exports = {
  getConfig: getConfig,
  saveConfig: saveConfig,
  dips: configuration.dips,
  fs: fs,
  user: user
  //close: close
};