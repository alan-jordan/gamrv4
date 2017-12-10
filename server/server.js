const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

module.exports = connection => {
  app.set("connection", connection);
  return app;
};
