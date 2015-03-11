var config = require('./configuration');
var dips = require('./configuration/dips');

module.exports = function (app) {
  //var client = require('./client');

  var getAppConfig = function (callback) {
    config.getAppConfig(app, callback);
  };

  var saveAppConfig = function (appConfig, callback) {
    config.saveAppConfig(app, appConfig, function (err) {
      if (err) return callback(err);
      //client.socket.emit('appdata', appConfig);
      callback(null);
    });
  };

  var getDip = function (dip, callback) {
    dips.getDip(dip, callback);
  };

  return {
    getAppConfig: getAppConfig,
    saveAppConfig: saveAppConfig,
    getDip: getDip
  }
};