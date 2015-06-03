var configuration = require('nachos-configuration');
var _ = require('lodash');

var config = configuration.settings('nachos').getSync();
var BASE_URL = 'http://localhost:' + config.port + '/api';

var client = require('socket.io-client')(BASE_URL);

// TODO: merge with nachos-configuration.configs, override config's functions with out own

module.exports = {
  settings: function (app) {
    var settingsFile = configuration.settings(app);

    //// Wrapping save of file
    //var save = settingsFile.save;
    //settingsFile.save = _.bind(function (config, cb) {
    //  save(config, function (err) {
    //    if (err) {
    //      return cb(err);
    //    }
    //
    //    client.emit('config.global-changed', {app: app, config: config});
    //    cb();
    //  });
    //}, settingsFile);

    settingsFile.onChange = function (cb) {
      client.on('config.global-changed:' + app, cb);
    };

    //var instance = settingsFile.instance;
    //settingsFile.instance = _.bind(function (id) {
    //  var returnedInstance = instance(id);
    //
    //
    //  //var saveInstance = returnedInstance.save;
    //  //returnedInstance.save = _.bind(function (config, cb) {
    //  //  saveInstance(config, function (err) {
    //  //    if (err) {
    //  //      return cb(err);
    //  //    }
    //  //
    //  //    client.emit('config.instance-changed', {instance: id, config: config});
    //  //
    //  //    cb();
    //  //  });
    //  //}, returnedInstance);
    //
    //  returnedInstance.onChange = function (cb) {
    //    client.on('config.instance-changed:' + id, cb);
    //  };
    //
    //  return returnedInstance;
    //}, settingsFile);

    return settingsFile;
  },
  packages: configuration.packages
};