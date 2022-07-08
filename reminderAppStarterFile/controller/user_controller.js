const database = require("../database/users").database;
const userModel = require("../database/users").users;

const getUserById = (id) => {
  try {
    let user = userModel.findById(id);
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const findOrCreateGithubUser = (githubId) => {
  let user = getUserById(githubId);
  if (user) {
    return user;
  }
  user = { id: githubId, name: githubId };
  database.push(user);
  return user;
};

const getUserByEmailAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const isUserValid = (user, password) => {
  return user.password === password;
};

module.exports = {
  getUserById,
  getUserByEmailAndPassword,
  findOrCreateGithubUser,
};
