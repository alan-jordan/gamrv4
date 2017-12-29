const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const users = require("./lib/users.js");

module.exports = function(app) {
  const connection = app.get("connection");
  app.use(require("cookie-parser")());
  app.use(
    require("express-session")({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new Strategy(
      {
        usernameField: "email"
      },

      function(email, password, done) {
        users.getUserByEmail(email, connection).then(function(user) {
          if (!user) {
            return done(null, false, { message: "User is not found" });
          }
          users.checkPassword(password, user.password).then(result => {
            result
              ? done(null, user)
              : done(null, false, { message: "Incorrect Password" });
          });
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    users
      .getUser(id, connection)
      .then(function(user) {
        done(null, user);
      })
      .catch(done);
  });
  return passport;
};
