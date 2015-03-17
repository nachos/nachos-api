var path = require('path');
var fs = require('fs');
var jf = require('jsonfile');
var mkdirp = require('mkdirp');

var getDefaultConfig = function () {
  return {
    name: 'Nacho Boy',
    email: 'nacho@gmail.com',
    shell: 'path\\to\\shell.exe',
    dips: path.resolve('../../dips')
  }
};

var getNachosHome = function () {
  var userHome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  return path.join(userHome, '.nachos');
};

var getOrCreate = function (relativePath, defaultJson, callback) {
  var fullPath = path.join(getNachosHome(), relativePath);

  fs.exists(fullPath, function (exists) {
    if (exists) {
      return jf.readFile(fullPath, callback);
    }

    mkdirp(path.dirname(fullPath), function (err) {
      if (err) {
        return callback(err);
      }

      jf.writeFile(fullPath, defaultJson, function (err) {
        if (err) {
          return callback(err);
        }

        return jf.readFile(fullPath, callback);
      })
    });
  });
};

var getAppRelativePath = function (app) {
  return path.join('apps', app + '.json');
};

var saveAppConfig = function (app, appConfig, callback) {
  jf.writeFile(path.join(getNachosHome(), getAppRelativePath(app)), appConfig, callback);
};

var getConfig = function (callback) {
  getOrCreate('nachos.json', getDefaultConfig(), callback);
};

var getAppConfig = function (app, callback) {
  getOrCreate(getAppRelativePath(app), {}, callback);
};

module.exports = {
  getConfig: getConfig,
  getAppConfig: getAppConfig,
  saveAppConfig: saveAppConfig
};