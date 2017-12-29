const bcrypt = require("bcryptjs");

const findUserByEmail = (connection, user_email) => {
  return connection("users")
    .where("user_email", user_email)
    .catch(err => new Error(`Error: ${err}`));
};

const findUsers = connection => {
  return connection("users")
    .select()
    .catch(err => new Error(`Error: ${err}`));
};

const createUser = (connection, userDetails) => {
  return bcrypt.hash(userDetails.user_password, 10).then(hash => {
    userDetails.user_password = hash;
    return connection("users")
      .insert(userDetails)
      .catch(err => new Error(`Error: ${err}`));
  });
};

module.exports = { findUserByEmail, findUsers, createUser };
