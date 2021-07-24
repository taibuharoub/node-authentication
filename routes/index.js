const authRoutes = require("../routes/auth");

const server = (app) => {
    app.get("/", (req, res, next) => {
      res.status(200).render("home")
    });

    app.use(authRoutes);
  };
  
  module.exports = server;