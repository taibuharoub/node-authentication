const path = require("path")

const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { accessLogStream } = require("./helpers/logging");
require("dotenv").config();

const configRoutes = require("./routes");

const server = express();

server.set("view engine", "ejs");
server.set("views", "views");

server.use(express.json());
server.use(express.urlencoded({ extended: false}));
server.use(express.static(path.join(__dirname, "public")))
server.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(cors());
server.use(compression());
server.use(morgan("combined", { stream: accessLogStream }));

configRoutes(server);

server.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

module.exports = server;
