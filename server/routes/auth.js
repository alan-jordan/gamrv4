const express = require("express");
const router = express.Router();
const passport = require("passport");
const users = require("../lib/users");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

function isAuthorisedUser(req, res, next) {
  if (!req.user) {
    res.redirect("/");
  } else if (req.user.id == req.params.id) {
    return next();
  } else {
    res.redirect("/not-authorised");
  }
}

router.get("/", (req, res) => {
  users
    .getUsers(req.app.get("connection"))
    .then(users => {
      res.render("index", { users: users, message: req.flash("error") });
    })
    .catch(function(err) {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  users
    .createUser(req.body, req.app.get("connection"))
    .then(result => {
      res.status(201).send("User created");
    })
    .catch(function(err) {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/resource",
    failureRedirect: "/",
    failureFlash: true
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/resource", ensureAuthenticated, function(req, res) {
  res.render("resource", { user: req.user });
});

module.exports = router;
