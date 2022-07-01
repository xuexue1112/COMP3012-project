let database = require("../database");
let passport = require("../middleware/passport");

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

  loginSubmit: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/login",
    });
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
