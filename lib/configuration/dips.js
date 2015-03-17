var path = require('path');
var fs = require('fs');
var jf = require('jsonfile');
var config = require('./');

var getDip = function (dipName, callback) {
  config.getConfig(function (err, configFile) {
    if (err) {
      return callback(err);
    }

    var dipPath = path.join(configFile.dips, dipName);
    fs.exists(dipPath, function (exists) {
      if (!exists) {
        return callback('dip doesn\'t exists');
      }

      var dipConfig = path.join(dipPath, 'dip.json');
      fs.exists(dipConfig, function (exists) {
        if (!exists) {
          return callback('dip.json doesn\' exist');
        }

        jf.readFile(dipConfig, function (err, config) {
          if (err) {
            return callback('error loading dip.json');
          }

          return callback(null, {path: dipPath, config: config});
        });
      });
    })
  });
};

module.exports = {
  getDip: getDip
};