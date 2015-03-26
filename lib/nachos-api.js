var configuration = require('nachos-configuration');

module.exports = function (app) {
  //var client = require('./client');

  var getAppConfig = function (callback) {
    configuration.configs.getApp(app, callback);
  };

  var saveAppConfig = function (appConfig, callback) {
    configuration.configs.saveApp(app, appConfig, function (err) {
      if (err) return callback(err);
      //client.socket.emit('appdata', appConfig);
      callback(null);
    });
  };

  /*var close = function () {
    client.socket.disconnect();
  };*/

  return {
    getConfig: configuration.configs.get,
    getAppConfig: getAppConfig,
    saveAppConfig: saveAppConfig,
    dips: configuration.dips
    //close: close
  }
};