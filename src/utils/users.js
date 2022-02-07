const users = [];

// addUser, removeUser, getUser, getUserInRoom

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

addUser({
  id: 1,
  username: 'Ashish',
  room: 'test',
});
console.log(users);

// const res = addUser({
//   id: 11,
//   username: 'Ashish',
//   room: 'test',
// });

// console.log(res);

const removedUser = removeUser(1);

console.log(removedUser);
console.log(users);
