const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const { accessLogStream } = require("./helpers/logging");
require("dotenv").config();

const configRoutes = require("./routes");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false}));
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
