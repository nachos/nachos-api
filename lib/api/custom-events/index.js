'use strict';

var client = require('../../utils/client');
var debug = require('debug')('nachosApi:customEvents');

module.exports = {
  /**
   * Register custom events
   *
   * @param {string} name Package name
   * @param {function} cb Event callback
   * @returns {function} Unregister function
   */
  on: function (name, cb) {
    return client.on('custom.' + name, cb);
  },

  /**
   * Emit custom event
   *
   * @param {string} name Package name
   * @param {object} data Data to emit
   * @returns {Socket} Socket io client
   */
  emit: function (name, data) {
    debug('emit event for package: %s with data: %j', name, data);

    return client.emit('custom.' + name, {
      name: name,
      data: data
    });
  },

  /**
   * Remove event listener
   *
   * @param {string} name Package name
   * @param {function} cb Event callback
   * @returns {Emitter} Socket io emitter
   */
  removeListener: function (name, cb) {
    return client.removeListener('custom.' + name, cb);
  }
};