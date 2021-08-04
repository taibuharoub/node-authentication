const authRoutes = require("../routes/auth");
const secretsRoutes = require("../routes/secrets");

const server = (app) => {
    app.get("/", (req, res, next) => {
      res.status(200).render("home")
    });

    app.use(authRoutes);
    app.use(secretsRoutes);
  };
  
  module.exports = server;