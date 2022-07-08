const passport = require("passport");
const userController = require("../controller/user_controller");
const GitHubStrategy = require("passport-github").Strategy;

const githubLogin = new GitHubStrategy(
  {
    clientID: "52752e0c5b74b74dce2b",
    clientSecret: "REMOVEDANDDELETED",
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
