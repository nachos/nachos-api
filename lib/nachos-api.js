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

  /*var close = function () {
    client.socket.disconnect();
  };*/

  return {
    getAppConfig: getAppConfig,
    saveAppConfig: saveAppConfig,
    dips: dips
    //close: close
  }
};