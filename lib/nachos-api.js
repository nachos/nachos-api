var config = require('./configuration');
var dips = require('./configuration/dips');

module.exports = function (app) {
  var getAppConfig = function (callback) {
    config.getAppConfig(app, callback);
  };

  var getDip = function (dip, callback) {
    dips.getDip(dip, callback);
  };

  return {
    getAppConfig: getAppConfig,
    getDip: getDip
  }
};