const User = require("../models/User");

exports.login = (req, res, next) => {
    res.status(200).render("login")
}

exports.register = (req, res, next) => {
    res.status(200).render("register")
}

exports.postRegister = (req, res, next) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    })

    newUser.save(err => {
        if(err) {
            console.log(err);
        } else {
            res.render("secrets");
        }
    })
}

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({email: username}, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.redirect("/login")
        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.render("secrets");
                }
            }else {
                res.redirect("/login")
            }
        }
    })
}