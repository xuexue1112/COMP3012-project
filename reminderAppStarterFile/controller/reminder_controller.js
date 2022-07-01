let database = require("../database");

let remindersController = {
  list: (req, res) => {
    let userId = req.user.id;
    let reminders = [];
    if (database[userId]) {
      reminders = database[userId].reminders;
    }
    res.render("reminder/index", { reminders: reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let userId = req.user.id;
    let reminders = [];
    if (database[userId]) {
      reminders = database[userId].reminders;
    }
    let reminderToFind = req.params.id;
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: reminders });
    }
  },

  create: (req, res) => {
    let userId = req.user.id;
    let reminders = [];
    if (database[userId]) {
      reminders = database[userId].reminders;
    }
    let reminder = {
      id: reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    reminders.push(reminder);
    database[userId] = { reminders: reminders };
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let userId = req.user.id;
    let reminders = [];
    if (database[userId]) {
      reminders = database[userId].reminders;
    }
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let userId = req.user.id;
    let reminders = [];
    if (database[userId]) {
      reminders = database[userId].reminders;
    }
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult["title"] = req.body.title;
    searchResult["description"] = req.body.description;
    searchResult["completed"] = req.body.completed == "true";
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let userId = req.user.id;
    let reminders = [];
    if (database[userId]) {
      reminders = database[userId].reminders;
    }
    let searchResult = reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let index = reminders.indexOf(searchResult);
    if (index !== -1) {
      reminders.splice(index, 1);
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
