const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('New Web Socket Connection');
  socket.emit('message', 'New User');
  socket.broadcast.emit('message', 'A new User has Joined');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
  socket.on('disconnect', (socket) => {
    io.emit('message', 'A user has left');
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
