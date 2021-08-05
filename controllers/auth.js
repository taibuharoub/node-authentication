const bcrypt = require("bcryptjs");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(User.createStrategy());

/* passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); */

//belows works with any kind of authenication
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets", //rediretc url set up in google console
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

exports.login = (req, res, next) => {
  res.status(200).render("login");
};

exports.register = (req, res, next) => {
  res.status(200).render("register");
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

exports.postRegister = (req, res, next) => {
  /* const user = {
    username: req.body.username,
    fullName: "Taibu haroub"
  } */
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/secrets");
        });
      }
    }
  );
};

exports.postLogin = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  //login() method comes from password and has to be
  // called on req
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }
  });
};

//OAuth 2.0 routes
/* exports.getOAouth = (req, res, next) => {
  // passport.authenticate("google", { failureRedirect: '/login' })
  passport.authenticate("google", { scope: ["profile"] })
}; */
exports.getOAouth = passport.authenticate("google", { scope: ["profile"] });

/* app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
); */

exports.getOauthCallback = passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {res.redirect("/");}
  // function (req, res) {
  //   // Successful authentication, redirect secrets page.
  //   res.redirect("/secrets");
  // }

// exports.getOauthCallback = (req, res, next) => {
//   passport.authenticate("google", { failureRedirect: "/login" })
//   // Successful authentication, redirect secrets page.
//   res.redirect("/secrets");
// }
  

