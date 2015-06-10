var _ = require('lodash');

module.exports = _.merge(require('./api/config'), require('./api/routes'), require('./api/custom-events'));