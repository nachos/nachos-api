var path = require('path');
var fs = require('fs');
var jf = require('jsonfile');
var config = require('./');
var npm = require('npm');

var get = function (dipName, callback) {
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
      jf.readFile(dipConfig, function (err, config) {
        if (err) {
          return callback('error reading dip config file');
        }

        return callback(null, { path: dipPath, config: config });
      });
    })
  });
};

var install = function (dipName, callback) {
  config.getConfig(function (err, configFile) {
    if (err) {
      return callback(err);
    }

    npm.load(function (err) {
      if (err) {
        return callback(err);
      }

      npm.commands.install(configFile.dips, [dipName], function (err) {
        if (err) {
          return callback(err);
        }
      });
    });
  })
};

module.exports = {
  get: get,
  install: install
};