var path = require('path');
var fs = require('fs');
var config = require('./');

var getDip = function (dip, callback) {
  config.getConfig(function (err, configFile) {
    if (err) {
      return callback(err);
    }

    var dipPath = path.join(configFile.dips, dip);
    fs.exists(dipPath, function (exists) {
      if (!exists) {
        return callback('dip doesn\'t exists');
      }

      return callback(null, dipPath);
    })
  });
};

module.exports = {
  getDip: getDip
};