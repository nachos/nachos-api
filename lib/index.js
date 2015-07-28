'use strict';

var _ = require('lodash');

module.exports = _.assign(require(require('./server'), './api/settings'), require('./api/routes'), require('./api/custom-events'));
