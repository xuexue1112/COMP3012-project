let userController = require("../controller/user_controller");
let passport = require("../middleware/passport");
let passportGithub = require("../middleware/passport-github");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  logout: (req, res, next) => {
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/login");
    });
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  registerSubmit: (req, res) => {
    // implement
  },

  sessionRevoke: (req, res) => {
    let userId = JSON.parse(
      req.sessionStore.sessions[req.body.sessionIdToRevoke]
    )["passport"]["user"];
    userController.invalidateUserSession(userId);
    res.redirect("/admin");
  },

  adminManage: (req, res) => {
    res.render("auth/admin", {
      sessionInfo: req.sessionStore.sessions,
      currentUser: req.user.name,
    });
  },
};

module.exports = authController;
