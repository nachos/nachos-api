var _ = require('lodash');

module.exports = _.merge({
  config: require('./api/config')
}, require('./api/routes'));