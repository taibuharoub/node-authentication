exports.login = (req, res, next) => {
    res.status(200).render("login")
}

exports.register = (req, res, next) => {
    res.status(200).render("register")
}