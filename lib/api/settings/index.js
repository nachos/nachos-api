'use strict';

var SettingsFile = require('nachos-settings-file');
var _ = require('lodash');
var client = require('../../utils/client');

module.exports = {
  /**
   * Build a wrapped instance of settings file
   * @param pkg Package name
   * @param options Default settings of the package
   * @returns {SettingsFile} Wrapped settings file
   */
  settings: function (pkg, options) {
    var settingsFile = new SettingsFile(pkg, options);

    var save = settingsFile.save;

    settingsFile.save = _.bind(function (config) {
      return save(config)
        .then(function () {
          client.emit('config.global-changed', {app: pkg, config: config});
        });
    }, settingsFile);

    /**
     * Register for global settings changes
     * @param cb Event callback
     */
    settingsFile.onChange = function (cb) {
      client.on('settings.global-changed:' + pkg, cb);
    };

    var instance = settingsFile.instance;

    settingsFile.instance = _.bind(function (id) {
      var returnedInstance = instance(id);

      var save = returnedInstance.save;

      returnedInstance.save = _.bind(function (config) {
        return save(config)
          .then(function () {
            client.emit('settings.instance-changed:' + returnedInstance._id, {instance: returnedInstance._id, config: config});
          });
      }, returnedInstance);

      /**
       * Register for instance settings changes
       * @param cb Event callback
       */
      returnedInstance.onChange = function (cb) {
        client.on('settings.instance-changed:' + returnedInstance._id, cb);
      };

      return returnedInstance;
    }, settingsFile);

    return settingsFile;
  }
};