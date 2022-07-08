const passport = require("passport");
const userController = require("../controller/user_controller");
const GitHubStrategy = require("passport-github").Strategy;

const githubLogin = new GitHubStrategy(
  {
    clientID: "52752e0c5b74b74dce2b",
    clientSecret: "c77b8a1e0eba384142aca5eb66dc92e2e6236964",
    callbackURL: "http://localhost:3001/github-login-callback",
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile.id);
    const user = userController.findOrCreateGithubUser(profile.id);
    return user ? cb(null, user) : cb(null, false, { message: "Error" });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  const user = userController.findOrCreateGithubUser(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "user not found" });
  }
});

module.exports = passport.use(githubLogin);
