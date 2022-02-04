const socket = io();

socket.on('welcome message', (msg) => {
  console.log(`Welcome!! ${msg}`);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message);
});
