'use strict';

var _ = require('lodash');

module.exports = _.merge(require('./server'), require('./api/config'), require('./api/routes'), require('./api/custom-events'));
