const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./passport");

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true
};

module.exports = connection => {
  const app = express();
  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "../public")));
  app.set("connection", connection);
  passport(app);
  return app;
};
