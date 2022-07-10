const database = [
  {
    id: 0,
    name: "Admin",
    email: "admin@test.com",
    password: "admin",
    role: "admin",
  },
  {
    id: 1,
    name: "Test",
    email: "test@test.com",
    password: "test",
    role: "user",
  },
];

const users = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error("Couldn't find user by email");
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error("Couldn't find user by id");
  },
};

module.exports = {
  database,
  users,
};
