var request = require('request');

var getCurrentUser = function (cb) {

  // Todo pass event
  request({ uri: 'http://localhost:9000/api/user/getCurrentUser', method: 'GET'}, function (err, response, body) {
    console.log(response, body);
    return body;
  });
};

module.exports = {
  getCurrentUser: getCurrentUser
};