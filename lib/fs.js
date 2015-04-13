var request = require('request');

var open = function (path) {
  request({ uri: 'http://localhost:9000/api/fs/open', method: 'POST', json: { path: path }}, function (err, response, body) {

  });
};

module.exports = {
  open: open
};