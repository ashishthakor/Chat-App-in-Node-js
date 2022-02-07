const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const {
  generateMessage,
  generateLocationMeaasage,
} = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('New Web Socket Connection');

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      ...options,
    });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', generateMessage('Admin', 'Welcome!'));
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage('Admin', ` ${user.username} has joined`)
      );

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    // console.log(user);
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profenity is not allowed');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });

  socket.on('sendLocation', (coords, callback) => {
    const user = getUser(socket.id);
    // console.log(user);
    io.to(user.room).emit(
      'locationMessage',
      generateLocationMeaasage(
        user.username,
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    );
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    // console.log(socket.id);
    // console.log(user);
    // console.log(user[0].room);

    if (user) {
      io.to(user[0].room).emit(
        'message',
        generateMessage('Admin', `${user[0].username} has left!`)
      );
      io.to(user[0].room).emit('roomData', {
        room: user[0].room,
        users: getUserInRoom(user[0].room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
