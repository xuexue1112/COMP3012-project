const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/user_controller");

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailAndPassword(email, password);
    return user ? done(null, user) : done(null, false, { message: "Error" });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "user not found" });
  }
});

module.exports = passport.use(localLogin);
