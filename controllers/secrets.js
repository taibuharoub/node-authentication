exports.getSecrets = (req, res, next) => {
    if (req.isAuthenticated()) {
        // console.log(req.user);
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
}