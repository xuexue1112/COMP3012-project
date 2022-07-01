const database = [
  { id: 1, name: "Test", email: "test@test.com", password: "test" },
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
