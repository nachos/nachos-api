var SettingsFile = require('nachos-settings-file');
var hooker = require('hooker');

var client = require('../../utils/client');

// TODO: merge with nachos-configuration.configs, override config's functions with out own

module.exports = {
  settings: function (app, options) {
    var settingsFile = new SettingsFile(app, options);

    hooker.hook(settingsFile, 'save', {
      pre: function () {
        var args = arguments;
        var cb = args[1];
        args[1] = function () {
          client.emit('settings.global-changed', {app: app, config: args[0]});
          cb();
        };

        return hooker.filter(this, args)
      }
    });

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

            return hooker.filter(this, args)
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