'use strict';

var client = require('../../utils/client');
var debug = require('debug')('nachosApi:customEvents');

module.exports = {
  /**
   * Register custom events
   * @param name Package name
   * @param cb Event callback
   * @returns {function} Unregister function
   */
  on: function (name, cb) {
    return client.on('custom.' + name, cb);
  },

  /**
   * Emit custom event
   * @param name Package name
   * @param data Data to emit
   * @returns {Socket} Socket io client
   */
  emit: function (name, data) {
    debug('emit event for package: %s with data: %j', name, data);

    return client.emit('custom.' + name, {name: name, data: data});
  },

  /**
   * Remove event listener
   * @param name Package name
   * @param cb Event callback
   * @returns {Emitter} Socket io emitter
   */
  removeListener: function (name, cb) {
    return client.removeListener('custom.' + name, cb);
  }
};