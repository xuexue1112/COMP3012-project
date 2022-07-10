module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.revokeSession === true) {
        req.user.revokeSession = false;
        req.logOut(function (err) {});
        res.redirect("/login");
        return;
      }
      return next();
    }
    res.redirect("/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminders");
  },
  ensureAuthenticatedAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") {
      if (req.user.revokeSession === true) {
        req.user.revokeSession = false;
        req.logOut(function (err) {});
        res.redirect("/login");
        return;
      }
      return next();
    }
    res.redirect("/login");
  },
};
