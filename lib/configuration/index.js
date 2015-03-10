var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var jsop = require('jsop');

var getDefaultConfig = function () {
  return {
    name: 'Nacho Boy',
    email: 'nacho@gmail.com',
    shell: 'path\\to\\shell.exe',
    dips: 'C:\\dips'
  }
};

var getNachosHome = function () {
  var userHome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  return path.join(userHome, '.nachos');
};

var getOrCreate = function (jsonPath, defaultJson, callback) {
  var configPath = path.join(getNachosHome(), jsonPath);

  fs.exists(configPath, function (exists) {
    if (exists) {
      return callback(null, jsop(configPath));
    }

    mkdirp(path.dirname(configPath), function (err) {
      if (err) {
        return callback(err);
      }

      fs.writeFile(configPath, JSON.stringify(defaultJson), function (err) {
        if (err) {
          return callback(err);
        }

        callback(null, jsop(configPath));
      })
    });
  });
};

var getConfig = function (callback) {
  getOrCreate('nachos.json', getDefaultConfig(), callback);
};

var getAppConfig = function (app, callback) {
  getOrCreate(path.join('apps', app + '.json'), {}, callback);
};

module.exports = {
  getConfig: getConfig,
  getAppConfig: getAppConfig
};