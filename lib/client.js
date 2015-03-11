var io = require('socket.io-client');
var socket = io('http://localhost:9000');

module.exports = {
  socket: socket
};