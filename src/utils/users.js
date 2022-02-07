const users = [];

const addUser = ({ id, username, room }) => {
  // clean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //   validate data
  if (!username || !room) {
    return {
      error: 'Username and room are requires',
    };
  }

  //   Check for existiong user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });

  //   validate username
  if (existingUser) {
    return {
      error: 'Username is in Use!',
    };
  }
  //   Store User
  const user = { id, username, room };
  users.push(user);
  return {
    user,
  };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index != -1) {
    return users.splice(index, 1);
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUserInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports({
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
});

// addUser({
//   id: 1,
//   username: 'Ashish',
//   room: 'test',
// });

// addUser({
//   id: 11,
//   username: 'xyz',
//   room: 'test',
// });

// addUser({
//   id: 111,
//   username: 'Thakor',
//   room: 'practice',
// });

// const user = getUser(11);
// console.log(user);

// const userList = getUserInRoom('test');
// console.log(userList);
