var configuration = require('nachos-configuration');
var getConfig = function (app, callback) {
  configuration.configs.get(app, callback);
};

var saveConfig = function (app, appConfig, callback) {
  configuration.configs.save(app, appConfig, function (err) {
    if (err) return callback(err);
    callback(null);
  });
};

module.exports = {
  get: getConfig,
  save: saveConfig,
  dips: configuration.dips
};