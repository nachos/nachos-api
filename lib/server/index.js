'use strict';

var nachosConfig = require('nachos-config');
var server = require('nachos-server-api');
var Q = require('q');

module.exports = {
  /**
   * Get server api
   */
  getServer: function () {
    return nachosConfig.get()
      .then(function (config) {
        var client = server();

        if (config.token) {
          return client.connect({token: config.token})
            .then(function () {
              return client;
            });
        }

        return Q.resolve(client);
      });
  }
};
