const bcrypt = require("bcryptjs");
const User = require("../models/User");

const saltRounds = 10;

exports.login = (req, res, next) => {
  res.status(200).render("login");
};

exports.register = (req, res, next) => {
  res.status(200).render("register");
};

exports.postRegister = (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });

    newUser.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            res.render("secrets");
          }
        });
      } else {
        res.redirect("/login");
      }
    }
  });
};
