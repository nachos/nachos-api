'use strict';

var _ = require('lodash');

module.exports = _.assign(require('./server'), require('./api/settings'), require('./api/routes'), require('./api/custom-events'));