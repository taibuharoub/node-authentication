const server = (app) => {
    app.get("/", (req, res, next) => {
      res.status(200).json({ message: "Default Index.js" });
    });
  };
  
  module.exports = server;