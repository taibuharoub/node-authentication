const bcrypt = require("bcryptjs");
const passport = require("passport")

const User = require("../models/User");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.login = (req, res, next) => {
  res.status(200).render("login");
};

exports.register = (req, res, next) => {
  res.status(200).render("register");
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}

exports.postRegister = (req, res, next) => {
  /* const user = {
    username: req.body.username,
    fullName: "Taibu haroub"
  } */
  User.register({username: req.body.username}, req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      res.redirect("/register")
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets")
      })
    }
  })
};

exports.postLogin = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  //login() method comes from password and has to be 
  // called on req
  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets")
      })
    }
  })
};
