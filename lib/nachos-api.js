var configuration = require('nachos-configuration');
var fs = require('./fs');
  //var client = require('./client');

var getAppConfig = function (app, callback) {
  configuration.configs.getApp(app, callback);
};

var saveAppConfig = function (app, appConfig, callback) {
  configuration.configs.saveApp(app, appConfig, function (err) {
    if (err) return callback(err);
    //client.socket.emit('appdata', appConfig);
    callback(null);
  });
};

/*var close = function () {
  client.socket.disconnect();
};*/

module.exports = {
  getConfig: configuration.configs.get,
  getAppConfig: getAppConfig,
  saveAppConfig: saveAppConfig,
  dips: configuration.dips,
  fs: fs
  //close: close
};