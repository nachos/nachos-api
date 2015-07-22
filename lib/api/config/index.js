'use strict';

var SettingsFile = require('nachos-settings-file');
var hooker = require('hooker');
var _ = require('lodash');
var client = require('../../utils/client');

module.exports = {
  settings: function (app, options) {
    var settingsFile = new SettingsFile(app, options);

    var save = settingsFile.save;

    settingsFile.save = _.bind(function (config) {
      return save(config)
        .then(function () {
          client.emit('config.global-changed', {app: app, config: config});
        });
    }, settingsFile);

    settingsFile.onChange = function (cb) {
      client.on('settings.global-changed:' + app, cb);
    };

    hooker.hook(settingsFile, 'instance', {
      post: function (returnedInstance) {
        hooker.hook(returnedInstance, 'save', {
          pre: function () {
            var args = arguments;
            var cb = args[1];

            args[1] = function () {
              client.emit('settings.instance-changed', {instance: returnedInstance._id, config: args[0]});
              cb();
            };

            return hooker.filter(this, args);
          }
        });

        returnedInstance.onChange = function (cb) {
          client.on('settings.instance-changed:' + returnedInstance._id, cb);
        };
      }
    });

    return settingsFile;
  }
};